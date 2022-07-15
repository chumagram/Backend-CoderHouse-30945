const express = require('express')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const random = require('./src/routes/randFather')
const PORT = 8081

if(cluster.isPrimary) { // isPrimary | isMaster
    console.log(`Primary PID ${process.pid}`);
    
    for (let index = 0; index < numCPUs; index++) {
        cluster.fork(PORT) // crea un worker para cada CPU
    }
    
    cluster.on('online', worker =>{
        console.log(`Worker PID ${worker.process.pid} online`);
    })
    cluster.on('exit', worker => {
        console.log(`Worker PID ${worker.process.pid} died`);
    })
    
} else { // entra al else cuando es un worker

    const app = express()
    
    //EXAMPLE: http://localhost:8081/api/randoms?cant=20000
    app.get('/api/randoms/', random.numRandRoute);

    app.listen(PORT, (err)=>{
        if(err) console.log(err);
        console.log('Servidor escuchando en el puerto:', PORT);
    });
}