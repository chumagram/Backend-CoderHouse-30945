// Importaciones
const { schema, normalize } = require('normalizr')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const usersMongo = require('./src/mongo/daos/UsuariosDaoMongo')
const messageMongo = require('./src/mongo/daos/MensajesDaoMongo')
const productMongo = require('./src/mongo/daos/ProductosDaoMongo')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

// Constantes
const app = express();
const publicPath = path.resolve(__dirname, "./public");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

// Configuraciones
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
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000, // mseg = 10 min
        httpOnly: false
    }
}))

// Esquemas de normalización
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

// INICIAR SESIÓN
app.post('/login', async (req, res) => {
    const id = req.body.email
    let user = await usersMongo.readUser(id)
    if(user.error) {
        res.cookie('initErr', true, { maxAge: 1000 }).redirect('/')
    } else {
        req.session.id = user.id;
        req.session.admin = true;
        req.session.logged = true;
        res.cookie('email', user.id).cookie('alias', user.alias).redirect('/main');
    }
})

// REGISTRARSE
app.post('/register', async (req, res) => {
    const newUser = req.body
    console.log(newUser);
    let userStatus = await usersMongo.addUser(newUser);
    if (userStatus.warning || userStatus.error){
        res.cookie('registerErr', true, { maxAge: 1000 }).redirect('/')
    } else {
        req.session.id = newUser.id;
        req.session.admin = true;
        req.session.logged = true;
        res.cookie('alias', newUser.alias).redirect('/main');
    }
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
        console.log(data);
        let user = await usersMongo.readUser(data);
        io.sockets.emit('res-session-status', user.session);
    }) 
});

// LEVANTAR SERVIDOR
const connectedServer = httpServer.listen(PORT, () => {
    console.log("Server HTTP con WEBSOCKETS escuchando en el puerto " + httpServer.address().port);
});
connectedServer.on('error', error => console.log (`Error en el servidor: ${error}`));