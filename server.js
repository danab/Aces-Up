var path = require('path');
var express = require('express');
var app = express();

app.use('/t', express.static('./build'))

app.get('/', function( req, res ) {
	res.redirect('/t');
});

// obviously...if this gets bigger I'll have to rethink routing...
app.get('/t', ( req, res ) => {
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// start that server up.
const port = process.env.port || 8081;
app.listen( port, function() {
	console.log( 'Example App listening on port ' + port ); // eslint-disable-line no-console
});