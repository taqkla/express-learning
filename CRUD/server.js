const express = require( 'express' );
const bodyParser= require("body-parser")
const path = require( 'path' );
const fs= require("fs")
const server = express(); // it creates a server

const router=require("./Routes/route")
const dotenv=require("dotenv")

//set up global configuration access
dotenv.config();

let port = process.env.PORT||3006
// middle wares
server.use( express.json() );
server.use(bodyParser.json())

server.use(router)

// server.get("/",(req,res)=>{
//     res.send("it is coming here")
// })

// const users = JSON.parse( fs.readFileSync( 'users.json', 'utf-8' ) ).users;

// server.get( '/', function ( req, res )
// {
//     // res.send( '{"name": "Prateek", "designation": "nodejs developer"}' );
//     console.log( users );
//     res.sendFile( path.join( __dirname, 'index.html' ) );
// } );


// server.get( '/users', function ( req, res )
// {
//     // res.send( '{"name": "Prateek", "designation": "nodejs developer"}' );
//     console.log( req.query );
//     const userId = req.query.userId;
//     res.send( users.filter( ( user ) => user.id == userId ) );
//     // res.send(users);
// } );

// server.get( '/user/:id', ( req, res ) =>
// {
//     const body = req.body.user;
//     console.log(body);
//     const userId = req.params.id;
//     const user = users.filter( user => user.id == userId );
//     res.statusCode = 201;
//     user.length == 0 ? res.sendStatus( 404 ) : res.send( user );
// } );

// server.post( '/user', ( req, res ) =>
// {
//     const user = req.body.user;
//     console.log( users.length );
//     users.push( user );
//     console.log( users.length );
//     console.log( users );
//     res.send( "Entry Created!" );
//     // fetch the req body which contain user object
//     // add the entry to users array above
//     // send statusCode = 201
// } );




// which port server is listening to
server.listen( port, () =>
{
    console.log( `Server started successfully on ${ port }` );
} );