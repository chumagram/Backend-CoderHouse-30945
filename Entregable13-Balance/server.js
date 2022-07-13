// IMPORTACIONES DE MÓDULOS
const express = require('express')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const path = require('path')

const session = require('express-session') // para el inicio de sesión
const passport = require('passport') // para el inicio de sesión
const dotenv = require('dotenv').config() // para variables de entorno

const {fork} = require('child_process'); // para crear subprocesos fork
const cluster = require('cluster') // para crear subprocesos cluster
const numCPUs = require('os').cpus().length // cantidad de núcleos de la CPU

const { Server: HttpServer } = require('http') // socket io necesita de http
const { Server: IOServer } = require('socket.io') // para socket io

const {socketUser} = require('./src/routes/socketUser')
const routes = require ('./src/routes/routes')
const {authUser} = require('./src/utils/authUser')
const argsOptions = require('./src/utils/argsOptions') // variables pasadas como argumento

// CONFIGURACIONES
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
const app = express();
const publicPath = path.resolve(__dirname, "./public");

const httpServer = new HttpServer(app); 
const io = new IOServer(httpServer);

const PORT = argsOptions.getPort(); // puerto pasado como argumento
const SMODE = argsOptions.serverMode(); // modo de servidor (FORK|CLUSTER)

// MIDDLEWARES
app.use(express.static(publicPath));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGODB_SCHOOLSTORE,
        mongoOptions: advancedOptions
    }),
    secret: 'chumagram',
    cookie: {
        maxAge: parseInt(process.env.SESSION_TIME),
        httpOnly: false,
        secure: false //& permite que se lea en http y https
    },
    //rolling: true, //& La se resetea el max age con cada acción
    resave: false, //& true -> Guardar sesión en navegador
    saveUninitialized: false //& true -> Guarda sesiones no inicializadas
}))

// Middleware de passport
app.use(passport.initialize());
app.use(passport.session());

//*---------------------- FIN DE LAS CONFIGURACIONES ------------------------

// INICIAR SERVIDOR (FORK o CLUSTER)
if(SMODE == 'FORK'){

    const connectedServer = httpServer.listen(PORT, () => {
        console.log("Server HTTP escuchando en el puerto " + httpServer.address().port);
    });
    connectedServer.on('error', error => console.log (`Error en el servidor: ${error}`)); 

} else if (SMODE == 'CLUSTER') {

    if(cluster.isPrimary) { // isPrimary | isMaster
        console.log(`Primary PID ${process.pid}`);

        for (let index = 0; index < numCPUs; index++) {
            cluster.fork(PORT) // crea un worker para cada CPU
        }

        cluster.on('online', worker =>{
            console.log(`Worker PID ${worker.process.pid} online`);
        })
        cluster.on('exit', worker => {
            console.log(`Worker PID ${worker.process.pid} died`);
        })
    
    } else { // entra al else cuando es un worker

        // SI SE QIOERE USAR CON EXPRESS:
        /* app.listen(PORT, (err)=>{
            if(err) console.log(err);
            console.log('Servidor escuchando en el puerto:', PORT);
        }); */
        
        // PARA LEVANTAR CON HTTP (habilita el uso de socket.io):
        httpServer.listen(PORT, () => {
            console.log("Server HTTP escuchando en el puerto " + httpServer.address().port);
        });
    }
}

// Funciones de autenticación del usuario
authUser();

// RAÍZ
app.get('/', routes.getRoot);

// PÁGINA PRINCIPAL
app.get('/main', routes.getMain);

// LOGIN
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), routes.postLogin)
app.get('/faillogin', routes.getFailLogin)

// SIGNUP
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), routes.postSignup)
app.get('/failsignup', routes.getFailSignup)

// SOCKET
io.on('connection', socketUser);

// INFO (FORK O CLUSTER)
app.get('/info', (req, res) => {
    let toSend = {nucleos: numCPUs, port: PORT}
    if (SMODE == 'FORK'){
        console.log(`Father PID ${process.pid}`)
        const child = fork('./src/utils/infoChild.js');
        child.send(toSend)
        child.on('message', (info) => {
            res.render('pages/info',{body: info});
        });
    } else {
        let info = routes.getInfo(toSend)
        res.render('pages/info',{body: info});
    }
})

// FAIL RUTE
app.get('*', routes.error404);