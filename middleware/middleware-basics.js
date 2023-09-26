const express = require( 'express' );
const fs = require( 'fs' );
const winston = require( 'winston' );

const app = express();
const port = 3000;


// Create a logger instance
const logger = winston.createLogger( {
    transports: [
        new winston.transports.Console(),
        new winston.transports.File( { filename: 'error.log' } ),
    ],
} );

app.use( express.json() ); // Builtin middlewares

class NotFoundError extends Error
{
    constructor ( message )
    {
        super( message );
        this.name = 'NotFoundError';
        this.status = 404;
    }
}

async function getDataFromDatabase( userId )
{
    fs.readFile( '/home/prateek/project/express-learning/basic-server/users.json', 'utf-8', ( error, data ) =>
    {
        // console.log( "Code coming here!" , userId);
        const users = JSON.parse( data ).users;
        // console.log( users.filter( user => user.id == userId ) );
        return users.filter( user => user.id == userId );
    } );

}

function findUserById( userId )
{
    const data = fs.readFileSync( '/home/prateek/project/express-learning/basic-server/users.json', 'utf-8' );
    const users = JSON.parse( data ).users;
    return users.filter( user => user.id == userId );
}

const centralizedErrorHandler = ( err, req, res, next ) =>
{
    if ( err instanceof NotFoundError )
    {
        return res.status( err.status ).json( { error: err.message } );
    }

    logger.error( err.stack );
    res.status( 500 ).json( { error: 'Something went wrong!' } );
};
// Custom middleware
// const loggingMiddleware = ( req, res, next ) =>
// {
//     if ( req.url == '/health' )
//     {
//         console.log( `[${ new Date().toISOString() }] ${ req.method } ${ req.url }` );
//     }

//     next();
// };
// app.use( loggingMiddleware );


// Error handle
// const errorHandler = ( err, req, res, next ) =>
// {
//     console.error( `Error occured while sending this ${ req.url }` );
//     res.status( 500 ).json( { error: 'Something went wrong!' } );
// };



// middleware
const healthCheck = ( req, res ) =>
{
    res.send( 'Server is running!' );
    // throw Error( 'Something went wrong' );
};


app.get( '/health', healthCheck );
// Usage
app.get( '/user/:id', ( req, res, next ) =>
{
    const user = findUserById( req.params.id );
    if ( !user.length )
    {
        // res.send( )
        return next( new Error( 'User not found' ) );
    }
    res.json( user );
} );



app.get( '/data/:id', async ( req, res, next ) =>
{
    const data = await getDataFromDatabase( req.params.id );
    console.log("data is this",  data );
    res.send( data );
    // .then( ( data ) => { } )
    // .catch( ( err ) => next( err ) );
} );

app.use( centralizedErrorHandler );


const server = app.listen( port, () =>
{
    logger.info( `Server is running on port ${ port }` );
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

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
});