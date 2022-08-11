const {Router} = require('express') // para el routing

const mainControllers = require ('../controllers/main')

const mainRouter = Router()

mainRouter.get('/', mainControllers.getMain)

module.exports = mainRouter