const contenedor = require('./container.js'); // llamamos al contenedor
const express = require('express');
const app = express();
const PORT = 8080;

app.get('/',(require,response)=>{
    response.send('Desafío entregable 3');
})

app.get('/productos',(require,response)=>{
    let array = contenedor.getAll();
    console.log('Todos los productos disponibles:\n',array);
    response.send(array);
})

app.get('/productoRandom',(require,response)=>{
    let array = contenedor.getAll();
    let i = Math.floor(Math.random()*(array.length));
    console.log(array[i]);
    response.send(array[i]);
})

const server = app.listen(PORT,()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));