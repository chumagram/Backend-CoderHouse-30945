const passport = require('passport') // para el inicio de sesión
const {Router} = require('express') // para el routing

const sessionMiddleware = require('../middlewares/session')
const loginController = require('../controllers/login')

const loginRouter = Router()

sessionMiddleware.local(loginRouter, passport);

loginRouter.post('/', passport.authenticate('login', { failureRedirect: '/login/fail' }), loginController.postLogin)
loginRouter.get('/fail', loginController.getFailLogin)

module.exports = loginRouter