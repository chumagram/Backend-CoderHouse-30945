const express = require('express')

const random = require('./src/routes/randFather')
const PORT = 8081

const app = express()

//EXAMPLE: http://localhost:8081/api/randoms?cant=20000
app.get('/api/randoms/', random.numRandRoute);

app.listen(PORT, err => {
    if(!err) console.log(`Express server in port ${PORT} - PID WORKER: ${process.pid}`);
});