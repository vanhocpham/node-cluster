const os = require( "os" );
const express = require( "express" );
const app = express();
const dotenv = require( "dotenv" );

dotenv.config( { "path": ".env" } );

const port = process.env.PORT;
const { spawn } = require("child_process");

const server = app.listen( port, () => {
  console.log( `Server running on port: ${port}` );
} );

app.get( "/", ( req, res, next ) => {
  for ( var i = 0; i < 2e6; i++ ) {}
  res.send("Hello World!");
} );
