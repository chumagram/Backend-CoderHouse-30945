// IMPORTACIONES
const { schema, normalize } = require('normalizr')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')

//& llamamos a passport
const passport = require('passport') 
//& llamamos a la estragia local de local passport
const LocalStrategy = require('passport-local').Strategy 

const usersMongo = require('./src/mongo/daos/UsuariosDaoMongo')
const messageMongo = require('./src/mongo/daos/MensajesDaoMongo')
const productMongo = require('./src/mongo/daos/ProductosDaoMongo')
const io = require('./src/config/socketConfig')
const {validatePass} = require('./src/utils/passValidator')
const {createHash} = require('./src/utils/hashGenerator')

const { Server: HttpServer } = require('http') 
/* const { Server: IOServer } = require('socket.io') */

const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

// CONSTANTES
const app = express();
const publicPath = path.resolve(__dirname, "./public");
const PORT = 8080;

/* const httpServer = new HttpServer(app); 
const io = new IOServer(httpServer);  */

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

//& Inicializa Middleware de passport
app.use(passport.initialize());
//& Inicializa la session de passport
app.use(passport.session());
//& Registrar la ruta login en passport
passport.use('login',new LocalStrategy(
    async (username, password, callback) => {
        let user = await usersMongo.readUser(username)
        if(user.error) {
            return callback(user.error) //& fallo de búsqueda
        } else if (user.notFound){
            return callback(null, false) //& no se encontró usuario
        } else {
            if(!validatePass(user, password)){
                return callback(null, false) //& password incorrecto
            } else {
                return callback(null, user) //& devuelve el usuario
            }
        }
    }
));
//& Registrar la ruta signup en passport
passport.use('signup', new LocalStrategy(
    //& le digo que quiero recibir el req y que se pase como parametro
    {passReqToCallback: true}, async (req, username, password, callback) => {
        const newUser = {
            id: username,
            password: createHash(password),
            name: req.body.name,
            lastname: req.body.lastname,
            age: req.body.age,
            alias: req.body.alias,
            avatar: req.body.avatar
        }
        let userStatus = await usersMongo.addUser(newUser);
        if (userStatus.found){
            return callback(null, false)
        } else {
            return callback(null, newUser)
        }
    }
))

//& passport necesita serializar...
passport.serializeUser((user, callback) => {
    callback(null, user.id) //& se pasa id porque es único en la DB
})
passport.deserializeUser(async (id, callback) => {
    let user = await usersMongo.readUser(id); //& se busca en la DB por id
    callback (null, user)
})

// NORMALIZATION SCHEMAS
const authorSchema = new schema.Entity('authorSchema')
const messageSchema = new schema.Entity('messageSchema',{commenter: authorSchema})
const chat = new schema.Entity('chats', {
    comments: [messageSchema],
    author: authorSchema
})

/*******************  FIN DE LAS CONFIGURACIONES  *******************/

// RAÍZ
app.get('/', function (req, res) {
    res.render('pages/index');
});

// PÁGINA PRINCIPAL
app.get('/main', function (req, res) {
    res.render('pages/main',{});
});

// LOGIN
//& Endpont de login modificado para que reaccione en función del passport
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), (req, res) => {
    if (req.isAuthenticated()) {
        //& req.user porque es lo que devuelve el LocalStrategy con su calback en login
        res.cookie('email', req.user.id).cookie('alias', req.user.alias).redirect('/main');
    }
});
//& Nuevo endponit para ser usado por passport
app.get('/faillogin', (req, res) => { 
    res.cookie('initErr', true, { maxAge: 1000 }).redirect('/')
})

// SIGNUP
//& Endponit de signup modificado para que reaccione a como lo determine passport
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), (req, res) => {
    if (req.isAuthenticated()) {
        res.cookie('alias', req.body.alias).redirect('/');
    }
})
//& Nuevo endpoint para ser usado por passport
app.get('/failsignup', (req, res) => { 
    res.cookie('registerErr', true, { maxAge: 1000 }).redirect('/')
})

// SOCKET
io.on('connection', async (socket) => {

    console.log('Cliente conectado');

    let allProducts = await productMongo.readAllProducts();
    socket.emit('productos', allProducts);

    let allMessages = await messageMongo.readAllMessage();
    let msjsNormalized = normalize(allMessages, [chat]);
    socket.emit('mensajeria', msjsNormalized);

    // Manejo de nuevo producto
    socket.on('new-product', async data => {
        await productMongo.createProduct(data);
        let allProd = await productMongo.readAllProducts();
        io.sockets.emit('productos', allProd);
    })

    // Manejo de nuevo mensaje
    socket.on('new-message', async data => {
        let email = data.email;
        let text = data.text;
        await messageMongo.addMessage(text, email);
        
        let allMsj = await messageMongo.readAllMessage();
        let msjsNormalized = normalize(allMsj, [chat]);
        io.sockets.emit('mensajeria', msjsNormalized);
    })

    // Manejo de verificación de sesión
    socket.on('session-status', async data =>{
        let user = await usersMongo.readUser(data);
        io.sockets.emit('res-session-status', user.session);
    }) 
});

// FAIL RUTE
function error404 (require, response){
    let ruta = require.path;
    let metodo = require.method;
    let notFound = 404;
    response.status(notFound).send({error: notFound, description: `la ruta ${ruta} con método ${metodo} no tiene ninguna función implementada`});
};
app.get('*', function(require, response){
    error404(require, response);
});
app.post('*', function(require, response){
    error404(require, response);
});
app.put('*', function(require, response){
    error404(require, response);
});
app.delete('*', function(require, response){
    error404(require, response);
});

// LEVANTAR SERVIDOR
connectedServer.on('error', error => console.log (`Error en el servidor: ${error}`));