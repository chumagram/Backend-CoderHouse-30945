// Importaciones
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')

// Mis importaciones
const {socketUser} = require('./src/routes/socketUser') // funciones por socket.io
const routes = require ('./src/routes/routes')
const {authUser} = require('./src/utils/authUser')

const { Server: HttpServer } = require('http') 
const { Server: IOServer } = require('socket.io') 
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

// CONSTANTES
const app = express();
const publicPath = path.resolve(__dirname, "./public");
const httpServer = new HttpServer(app); 
const io = new IOServer(httpServer); 
const PORT = 8080;

// CONFIGURACIONES Y MIDDLEWARE

app.use(express.static(publicPath));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({ 
        mongoUrl: 'mongodb+srv://chumagram:test1234@cluster0.ar5vn.mongodb.net/schoolStore?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: 'chumagram',
    cookie: {
        maxAge: 5000, // 600000 mseg = 10 min
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

// LEVANTAR SERVIDOR
const connectedServer = httpServer.listen(PORT, () => {
    console.log("Server HTTP con WEBSOCKETS escuchando en el puerto " + httpServer.address().port);
});
connectedServer.on('error', error => console.log (`Error en el servidor: ${error}`));