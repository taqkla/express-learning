import mongoose from 'mongoose';
import config from './index';

const options = {
    autoIndex: false, 
    maxPoolSize: 10,
    dbName: 'blogistan'
}

const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  mongoose.connect(config.DATABASE_URL, options).then(()=>{
    console.log('MongoDB is connected')
  }).catch(err => {
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.', err)
    setTimeout(connectWithRetry, 5000)
  })
}

connectWithRetry();