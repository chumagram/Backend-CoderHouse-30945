const passport = require('passport') // para el inicio de sesión
const {Router} = require('express') // para el routing

const sessionMiddleware = require('../middlewares/session')
const signupController = require('../controllers/signup')

const signupRouter = Router()

sessionMiddleware.local(signupRouter, passport);

signupRouter.post('/', passport.authenticate('signup', { failureRedirect: '/signup/fail' }), signupController.postSignup)
signupRouter.get('/fail', signupController.getFailSignup)

module.exports = signupRouter