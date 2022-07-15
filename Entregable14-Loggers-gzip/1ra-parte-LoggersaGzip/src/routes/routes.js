const myLogs = require('../utils/logsGenerator');

function error404 (req, res){
    myLogs.showWarning(req.path, req.method);
    res.status(404).send({error: 404, description: `la ruta ${req.path} con método ${req.method} no tiene ninguna función implementada`});
}

function getRoot (req, res){
    myLogs.showInfo(req.path, req.method);
    res.render('pages/index');
}

function getMain (req, res){
    myLogs.showInfo(req.path, req.method)
    res.render('pages/main',{});
}

function postLogin (req, res){
    myLogs.showInfo(req.path, req.method)
    if (req.isAuthenticated()) {
        res.cookie('email', req.user.id).cookie('alias', req.user.alias).redirect('/main');
    }
}

function getFailLogin (req, res){
    myLogs.showInfo(req.path, req.method)
    res.cookie('initErr', true, { maxAge: 1000 }).redirect('/')
}

function postSignup (req, res){
    myLogs.showInfo(req.path, req.method)
    if (req.isAuthenticated()) {
        res.cookie('alias', req.body.alias).redirect('/');
    }
}

function getFailSignup (req, res){
    myLogs.showInfo(req.path, req.method)
    res.cookie('registerErr', true, { maxAge: 1000 }).redirect('/')
}

function getInfo (data) {
    myLogs.showInfo(req.path, req.method)
    let info = {
        entryArg: data.port,
        execPath: process.execPath,
        os: process.platform,
        idProcess: process.pid,
        nodeVersion: process.version,
        directorio: process.cwd(),
        memory: process.memoryUsage(),
        numCPUs: data.nucleos
    };
    return info
}

module.exports = {
    error404,
    getRoot,
    getMain,
    postLogin,
    getFailLogin,
    postSignup,
    getFailSignup,
    getInfo
}