// IMPORTACIONES DE MÓDULOS
const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config() // para variables de entorno

const {fork} = require('child_process'); // para crear subprocesos fork
const numCPUs = require('os').cpus().length // cantidad de núcleos de la CPU

const { Server: HttpServer } = require('http') // socket io necesita de http
const { Server: IOServer } = require('socket.io') // para socket io

const serverControllers = require ('./src/controllers/server')
const authUser = require('./src/services/authUser')
const initServer = require('./src/services/initServer')

const compression = require('compression'); // llamamos a compression de gzip

// Llamadas a ROUTES
const loginRouter = require('./src/routes/login')
const signupRouter = require('./src/routes/signup')
const mainRouter = require('./src/routes/main')
const socketUser = require('./src/routes/socketUser')

// CONFIGURACIONES
const app = express();
const publicPath = path.resolve(__dirname, "./public");

const httpServer = new HttpServer(app); 
const io = new IOServer(httpServer);

// MIDDLEWARES
app.use(express.static(publicPath));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(compression()); //* usamos el middleware de compresion

//?_______________________| FIN DE LAS CONFIGURACIONES |__________________________

// INICIAR SERVIDOR (FORK o CLUSTER)
initServer(httpServer);

// ROUTING
app.use('/login', loginRouter) // Router para login
app.use('/signup', signupRouter) // Router para signup
app.use('/main', mainRouter) // Router para página principal (main)
io.on('connection', socket => socketUser(socket, io)); // Router para socket.io

// Funciones de autenticación del usuario
authUser();

// RAÍZ
app.get('/', serverControllers.getRoot);

// INFO (FORK O CLUSTER)
app.get('/info', (req, res) => {
    let toSend = {nucleos: numCPUs, port: PORT}
    if (SMODE == 'FORK'){
        const child = fork('./src/utils/infoChild.js');
        child.send(toSend)
        child.on('message', (info) => {
            res.render('pages/info',{body: info});
        });
    } else {
        let info = serverControllers.getInfo(toSend)
        res.render('pages/info',{body: info});
    }
})

// FAIL RUTE
app.get('*', serverControllers.error404);