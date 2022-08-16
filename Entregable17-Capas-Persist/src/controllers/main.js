const myLogs = require('../utils/logsGenerator');

function getMain (req, res){
    myLogs.showInfo(req.path, req.method)
    res.render('pages/main',{});
}

module.exports = {getMain}