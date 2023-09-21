const jwt = require( 'jsonwebtoken' );
const express = require( 'express' );
const multer = require( 'multer' );

const app = express();

// Route for user login
app.post( '/login', ( req, res ) =>
{
    // Check credentials and validate user
    const user = { id: 1, username: 'Patrick Wane' };
    const token = jwt.sign( user, 'secretKey' );
    res.json( { token } );
} );

// Protected route that requires authentication
app.get( '/profile', authenticateToken, ( req, res ) =>
{
    console.log( req.user );
    res.send( `Welcome, ${ req.user.username }!` );
} );

// Middleware to check if the request has a valid JWT token
function authenticateToken( req, res, next )
{
    const token = req.header( 'Authorization' );
    if ( !token ) return res.sendStatus( 401 );

    jwt.verify( token, 'secretKey', ( err, user ) =>
    {
        if ( err ) return res.sendStatus( 403 );
        req.user = user;
        next();
    } );
}


// Configure multer for file uploads
const storage = multer.diskStorage( {
    destination: ( req, file, cb ) =>
    {
        cb( null, 'uploads/' );
    },
    filename: ( req, file, cb ) =>
    {
        cb( null, file.originalname );
    }
} );

const upload = multer( { storage } );

// Route for file upload
app.post( '/upload', upload.single( 'file' ), ( req, res ) =>
{
    res.send( 'File uploaded successfully!' );
} );

app.listen( 3000 );