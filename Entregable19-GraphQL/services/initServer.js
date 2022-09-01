const config = require('../config/envPath')
const cluster = require('cluster') // para crear subprocesos cluster

const PORT = config.PORT || 8080
const SMODE = config.SMODE || 'NORMAL'

function initServer(app){
    if(SMODE == 'NORMAL'){
    
        app.listen(PORT, () => {
            console.log("Server HTTP escuchando en el puerto " + PORT);
        });
    
    } else if (SMODE == 'CLUSTER') {
    
        if(cluster.isPrimary) { // isPrimary | isMaster
            console.log(`Primary PID ${process.pid}`);
    
            for (let index = 0; index < numCPUs; index++) {
                cluster.fork(PORT) // crea un worker para cada CPU
            }
    
            cluster.on('online', worker => {
                console.log(`Worker PID ${worker.process.pid} online`);
            })
            cluster.on('exit', worker => {
                console.log(`Worker PID ${worker.process.pid} died`);
            })
        
        } else { // entra al else cuando es un worker
            
            app.listen(PORT, () => {
                console.log("Server HTTP escuchando en el puerto " + app.address().port);
            });
        }
    }
}

module.exports = {initServer}