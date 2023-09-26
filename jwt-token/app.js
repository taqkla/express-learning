const jwt = require( 'jsonwebtoken' );
const express = require( 'express' );

const app = express();

// app.use(authenticateToken);  //middleware

// Route for user login
app.post( '/login', ( req, res ) =>
{
    // Check credentials and validate user
    const user = { id: 1, username: 'Patrick Wane' };
    const token = jwt.sign( user, 'bosscoderkey' );
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

app.listen( 3000 );