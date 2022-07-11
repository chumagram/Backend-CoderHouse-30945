// IMPORTACIONES
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const path = require('path')
const dotenv = require('dotenv').config()
const yargs = require('yargs/yargs')(process.argv.slice(2))

const {socketUser} = require('./src/routes/socketUser')
const routes = require ('./src/routes/routes')
const {authUser} = require('./src/utils/authUser')
const {getPort} = require('./src/utils/port')

// CONFIGURACIONES
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
const app = express();
const publicPath = path.resolve(__dirname, "./public");
const httpServer = new HttpServer(app); 
const io = new IOServer(httpServer); 
const PORT = getPort();
//se pueden usar los puertos 49152 al 65535 como alternativa al 8080. Éste último se usa solo para testéo y está por default

// MIDDLEWARE
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

// FAIL RUTE
app.get('*', routes.error404);

// INFO
app.get('/info', (req, res) => {
    let info = routes.getInfo(PORT)
    res.render('pages/info',{body: info});
})

// LEVANTAR SERVIDOR
const connectedServer = httpServer.listen(PORT, () => {
    console.log("Server HTTP con WEBSOCKETS escuchando en el puerto " + httpServer.address().port);
});
connectedServer.on('error', error => console.log (`Error en el servidor: ${error}`));