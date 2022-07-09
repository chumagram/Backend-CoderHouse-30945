const express = require('express')
const random = require('./src/routes/randFather')

const { Server: HttpServer } = require('http')
const app = express()
const httpServer = new HttpServer(app) 
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//EXAMPLE: http://localhost:8080/api/randoms?cant=20000
app.get('/api/randoms/', random.forkRandRoute);

const connectedServer = httpServer.listen(PORT, () => {
    console.log("Server HTTP con WEBSOCKETS escuchando en el puerto " + httpServer.address().port);
});
connectedServer.on('error', error => console.log (`Error en el servidor: ${error}`));