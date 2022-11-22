const express = require('express'),
        app = express(),
        port = 4000,
        { connection } = require('./database/db_con'),
        router = require('./routes/router'),
        viewsDir = `${ __dirname }/views`


app.set( 'view engine', 'pug' )
    .set( 'views', viewsDir )
    .use( express.json() )
    .use( express.urlencoded( { extended: false } ) )
    .use( router )
    .listen(port, ()=>{
        console.log(`Conectado en el puerto: ${port}`)
        connection.con()
    })