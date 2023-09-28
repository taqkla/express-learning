const jwt = require( 'jsonwebtoken' );
const express = require( 'express' );
const multer = require( 'multer' );
const router=express.Router();
const bodyParser=require("body-parser")
const app = express();
const env=require("dotenv");
const rateLimit=require('express-rate-limit')
const {validationResult}=require('express-validator')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
const logginMiddleWare=(req,res,next)=>{
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next()
}
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  };
// Route for user login
app.post( '/login', errorHandler,( req, res ) =>
{
    // Check credentials and validate user
    const user = { id: 1, username: 'Patrick Wane' };
    const token = jwt.sign( user, 'secretKey' );
    if(user.id!=1)return errorHandler()
    res.json( { token } );
} );
app.use(errorHandler);
app.use((req,res,next)=>{
    res.status(404).json({error:'Route not found'})
})
// Protected route that requires authentication
app.get( '/profile', authenticateToken, ( req, res ) =>
{
    console.log( req.user );
    res.send( `Welcome, ${ req.user.username }!` );
} );

// Middleware to check if the request has a valid JWT token
function authenticateToken( req, res, next )
{
    if ( req.header('User') == 'anonymous' ) { next(); return; }
    const token = req.header( 'Authorization' );
    if ( !token ) return res.sendStatus( 401 );

    jwt.verify( token, 'bosscoderkey', ( err, user ) =>
    {
        if ( err ) return res.sendStatus( 403 );
        req.user = user;
        next();
    } );
}
//rate limit
const limiter=rateLimit({
    windowMs:30*30*500,
    max:2000,
    message:'Too many requests from this IP , please try again later'
})
app.use("/api",limiter)

//custom error classes

class NotFoundError extends Error{
    constructor(message){
        super(message)
        this.name="NotFoundError",
        this.status=404
    }
}
//usage
const findUserById=()=>{
    return null
}
app.get("/user/:id",(req,res,next)=>{
    const user=findUserById(req.params.id);
    if(!user){
        return next(new NotFoundError('User not found'))
    }
    res.json(user)
})

// // Configure multer for file uploads
// const storage = multer.diskStorage( {
//     destination: ( req, file, cb ) =>
//     {
//         cb( null, 'uploads/' );
//     },
//     filename: ( req, file, cb ) =>
//     {
//         cb( null, file.originalname );
//     }
// } );

// const upload = multer( { storage } );

// // Route for file upload
// app.post( '/upload', upload.single( 'file' ), ( req, res ) =>
// {
//     res.send( 'File uploaded successfully!' );
// } );

//middle ware for input validation
// const validationUserInput=(req,res,next)=>{
//     const {username,email,password}=req.body
//     if(!username||!email||!password){
//         return res.status(400).json({error:"Incomplete user data"})
        
//     }
//     next()
// }
// const validationUserInput=[
//     body("username").notEmpty().withMessage("Username is required"),
//     body("email").isEmail().withMessage("Invalid email format"),
//     body("password").isLength({min:6}).withMessage('Password must be atleast 6 characters long')
// ]
// app.use(validationUserInput)
app.post("/input",(req,res,next)=>{
    // const errors=validationResult(req);
    // if(!errors.isEmpty()){
    //     return res.status(400).json({errors:errors.array()})
    // }
//    const {username,email,password}=req.body
   console.log("it is passing all the condition")
   res.json("finally");
})
//Using API router
app.use("/api",router)
router.get("/data",async(req,res,next)=>{
    try{
        const data=await fetchDataFromDatabse();
        res.json(data);

    }catch(e){
        console.log("it is passing here")
        next(e)
    }
})
const createErrorResponse=(message,status)=>({
    error:{message,status}
})
app.get("/data9",(req,res,next)=>{
    try{
        throw Error('');
    }catch(e){
        res.status(500).json(createErrorResponse('Something went wrong',500))
    }
})
app.use((req,res,next)=>{
    res.status(404).json({error:'Route not found'})
})
const server=app.listen( 3000,() =>{
    console.log(`App is running ${3000}`)
});
process.on('SIGINT',()=>{
    console.log('Shutting down server gracefully ...');
    server.close(()=>{
        console.log('Server has been closed');
        process.exit(0)
    })
});

//Environment-based Error Handling
// in production we should be more cautious to avoid exposing sensitive information

// const asyncWraper=(asyncFn)=>(req,res,next)=>{
//     asyncFn(req,res,next).catch(next);

//     //Usage
//     const fetchData=async(req,res)=>{
//         const data=await fetchDataFromDatabase();
//         res.json(data)
//     }
// }
// app.get('/data',asyncWraper(fetchData))
module.exports={
    authenticateToken:authenticateToken
}
