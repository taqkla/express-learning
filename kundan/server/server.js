import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import UserRoutes from './Routes/User.js';
import TaskRoutes from './Routes/Task.js';
import { Register } from './Controllers/User.js';
import tasks from './data/tasks.js';
import Task from './models/Task.js';
import winston from 'winston';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const corsOrigin = {
    origin: process.env.BASE_URL,
    credentials: true,
};
const app = express();

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log' }),
    ],
});

app.use(express.json());
app.use(cors(corsOrigin));
app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets');
    },
    filename: function (req, file, cb) {
        const picturePath = new Date().toISOString().replace(/:/g, '-') + file.originalname;
        req.body.picturePath = picturePath;
        cb(null, picturePath);
    },
});

const upload = multer({ storage });

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';

    // Log the error using the Winston logger
    logger.error(`[${new Date().toISOString()}] [Error] Status: ${status} Message: ${message}`);

    return res.status(status).json({ message });
});

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_DB).then(() => {
    app.listen(PORT, () => {
        // One time insertion to Db
        // Task.insertMany(tasks)
        logger.info(`App is listening on PORT ${PORT}`);
        logger.info("Database Connected");
    });
}).catch((err) => {
    logger.error("Database Connection failed", err);
});

app.use('/auth/register', upload.single('picture'), Register);
app.use('/auth', UserRoutes);
app.use('/task', TaskRoutes);

app.get('/', (req, res) => {
    res.send('Server Hosted');
});
