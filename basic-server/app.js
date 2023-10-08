const express = require( "express" );
const fs = require( 'fs' );

const server = express();
const port = 3000;

server.use( express.json() );

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
    user.length == 0 ? res.sendStatus( 404 ) : res.send( user );
} );

server.post( '/users', ( req, res ) =>
{
    console.log( 'request body : ', req );
    console.log(users.length);
    console.log(req.body.user);
    users.push( req.body.user );
    console.log(users.length);
    res.sendStatus( 201 );
} );

server.listen( port, () =>
{
    console.log( `Server started successfully on ${ port }` );
} );



// const express = require('express');
// const app = express();
// const path = require('path');
// const PORT = 3000;
// const fs = require( 'fs' );
// const users = JSON.parse(fs.readFileSync('users.json', 'utf-8')).users;

// app.get('/', (req, res) => {
//     // res.send('<h1>Hello word</h1>');
//     console.log(users);
//     res.sendFile(path.join(__dirname, 'index.html'));
// })

// app.get('/users', (req, res) => {

//     const userId = req.query.userId;
//     // res.send(users.filter((user) => {
//     //     user.id == userId
//     // }));
//     // console.log(req.query.userId);
//     res.send(users);
//     // console.log(users);
//     // res.sendFile(path.join(__dirname, 'index.html'));
// })

// app.listen(PORT, () => {
//     console.log(`Server Started Successfully on ${PORT}`);
// })