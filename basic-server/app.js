const express = require( "express" );
const fs = require( 'fs' );

const server = express();
const port = 3000;

const users = JSON.parse( fs.readFileSync( 'users.json', 'utf-8' ) ).users;

server.get( '/', ( req, res ) =>
{
    // res.send("Welcome to Express Js learning tutorial!")
    res.sendFile( __dirname + "/index.html" );
} );

// Handling get and post requests
server.get( '/users', ( req, res ) =>
{
    res.sendFile( __dirname + "/users.json" );
} );

server.get( '/users/:id', ( req, res ) =>
{
    const userId = req.params.id;
    const user = users.filter( user => user.id == userId );
    user.length == 0 ? res.send( "Not Found" ) : res.send( user );
} );

server.post( '/users/:id', ( req, res ) =>
{
    const userId = req.params.id;
    const user = users.filter( user => user.id == userId );
    user.length == 0 ? res.send( "Not Found" ) : res.send( user );
} );

server.listen( port, () =>
{
    console.log( `Server started successfully on ${ port }` );
} );