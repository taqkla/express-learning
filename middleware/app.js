const express = require( 'express' );
const birds = require( './router' );
const fs = require( 'fs' );
const winston = require( 'winston' );

const app = express();
const port = 3000;
// console.log(process.env);

async function fetchDataFromDatabase()
{
    const data = fs.readFileSync( '/home/prateek/project/express-learning/basic-server/users.json', 'utf-8' );
    console.log( JSON.parse( data ) );
    return JSON.parse( data ).users;
}

// Create a logger instance
const logger = winston.createLogger( {
    transports: [
        // new winston.transports.Console(),
        new winston.transports.File( { filename: 'error.log' } ),
    ],
} );

// Error handling middleware with logging
const errorHandlerWithLogging = ( err, req, res, next ) =>
{
    logger.error( err.stack );
    res.status( 500 ).json( { error: 'Something went wrong! Please try again later.' } );
};


// Logging Middleware
const loggingMiddleware = ( req, res, next ) =>
{
    console.log( `[${ new Date().toISOString() }] ${ req.method } ${ req.url }` );
    next();
};
app.use( express.json() );

// const errorhandler = ( err, req, res, next ) =>
// {
//     console.log( err.stack );
//     // return error response
//     res.status( 500 ).json( { error: 'Something went wrong!' } );
// };
// Using the Middleware
app.use( loggingMiddleware );
app.use( '/birds', birds );
app.get( '/data', ( req, res, next ) =>
{
    fetchDataFromDatabase()
        .then( ( data ) => { console.log( data ); res.json( data ); } )
        .catch( ( err ) => next( err ) );
} );


// app.use( errorhandler );

// Register the errorHandlerWithLogging middleware
app.use( errorHandlerWithLogging );





const server = app.listen( port, () =>
{
    console.log( `Server started successfully on ${ port }` );
} );

process.on( 'SIGINT', () =>
{
    console.log( 'Shutting down server gracefully...' );
    // console.log( app );
    server.close( () =>
    {
        console.log( 'Server has been closed.' );
        process.exit( 0 );
    } );
} );