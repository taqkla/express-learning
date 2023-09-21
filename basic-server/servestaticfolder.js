const express = require( "express" );
const fs = require( 'fs' );
const path = require( "path" );

const server = express();
const port = 3000;

server.use( express.static( path.join( __dirname, "scientific-calculator" ) ) );

server.listen( port, () =>
{
    console.log( `Server started successfully on ${ port }` );
} );