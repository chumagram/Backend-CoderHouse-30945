//* Importaciones de módulos
const express = require('express')
const path = require('path')
const compression = require('compression')

//* Llamadas de archivos externos
const RouterProductos = require('./routes/productos')
const RouterMensajes = require('./routes/mensajes')
const {error404} = require ('./controller/server')
const {initServer} = require('./services/initServer')

//* Configuraciones
const app = express()
const publicPath = path.resolve(__dirname, './public')
const routerProductos = new RouterProductos()
const routerMensajes = new RouterMensajes()

//* Middlewares
app.use(express.static(publicPath))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(compression());

//* Rutas manejadas por Router
app.use('/productos', routerProductos.start())
app.use('/mensajes', routerMensajes.start())

//* Iniciar servidor
initServer(app);

//* Rutas no contempladas
app.get('*', error404);