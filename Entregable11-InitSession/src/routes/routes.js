function error404 (require, response){
    let ruta = require.path;
    let metodo = require.method;
    let notFound = 404;
    response.status(notFound).send({error: notFound, description: `la ruta ${ruta} con método ${metodo} no tiene ninguna función implementada`});
}

function getRoot (req, res){
    res.render('pages/index')
}

function getMain (req, res){
    res.render('pages/main',{});
}

function postLogin (req, res){
    if (req.isAuthenticated()) {
        //& req.user porque es lo que devuelve el LocalStrategy con su calback en login
        res.cookie('email', req.user.id).cookie('alias', req.user.alias).redirect('/main');
    }
}

function getFailLogin (req, res){
    res.cookie('initErr', true, { maxAge: 1000 }).redirect('/')
}

function postSignup (req, res){
    if (req.isAuthenticated()) {
        res.cookie('alias', req.body.alias).redirect('/');
    }
}

function getFailSignup (req, res){
    res.cookie('registerErr', true, { maxAge: 1000 }).redirect('/')
}

module.exports = {
    error404,
    getRoot,
    getMain,
    postLogin,
    getFailLogin,
    postSignup,
    getFailSignup
}