const argsOptions = require('../utils/argsOptions') // argumentos por consola
const cluster = require('cluster') // para crear subprocesos cluster

const PORT = process.env.PORT || argsOptions.getPort();
const SMODE = argsOptions.serverMode(); //FORK||CLUSTER

function initServer(httpServer){
    if(SMODE == 'FORK'){
    
        httpServer.listen(PORT, () => {
            console.log("Server HTTP escuchando en el puerto " + httpServer.address().port);
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
            
            httpServer.listen(PORT, () => {
                console.log("Server HTTP escuchando en el puerto " + httpServer.address().port);
            });
        }
    }
}

module.exports = initServer