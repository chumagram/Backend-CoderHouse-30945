const myLogs = require('../utils/logsGenerator');

function error404 (req, res){
    myLogs.showWarning(req.path, req.method);
    res.status(404).send({error: 404, description: `la ruta ${req.path} con método ${req.method} no tiene ninguna función implementada`});
}

module.exports = {
    error404
}