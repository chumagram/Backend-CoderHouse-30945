const myLogs = require('../utils/logsGenerator');

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

module.exports = {
    postSignup,
    getFailSignup,
}