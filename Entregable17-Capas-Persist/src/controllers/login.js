const myLogs = require('../utils/logsGenerator');

function getFailLogin (req, res){
    myLogs.showInfo(req.path, req.method)
    res.cookie('initErr', true, { maxAge: 1000 }).redirect('/')
}

function postLogin (req, res){
    myLogs.showInfo(req.path, req.method)
    if (req.isAuthenticated()) {
        res.cookie('email', req.user.id).cookie('alias', req.user.alias).redirect('/main');
    }
}

module.exports = {
    getFailLogin,
    postLogin,
}