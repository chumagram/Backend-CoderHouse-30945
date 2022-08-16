const myLogs = require('../utils/logsGenerator');

function error404 (req, res){
    myLogs.showWarning(req.path, req.method);
    res.status(404).send({error: 404, description: `la ruta ${req.path} con método ${req.method} no tiene ninguna función implementada`});
}

function getRoot (req, res){
    myLogs.showInfo(req.path, req.method);
    res.render('pages/index');
}

function getInfo (data) {
    myLogs.showInfo(data.path, data.method)
    
    let info = {
        entryArg: data.port,
        execPath: process.execPath,
        os: process.platform,
        idProcess: process.pid,
        nodeVersion: process.version,
        directorio: process.cwd(),
        memory: process.memoryUsage().rss,
        numCPUs: data.nucleos
    };
    
    return info
}

module.exports = {
    error404,
    getRoot,
    getInfo
}