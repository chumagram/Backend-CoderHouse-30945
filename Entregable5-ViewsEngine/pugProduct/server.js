const express = require('express');
const contenedor = require('./public/scripts/container.js');
const {Router} = express;

const app = express();
const PORT = 8080;
const router = Router();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/productos', router);
app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/public'));

/*******************  FIN DE LAS CONFIGURACIONES  *****************/

// PAGINA RAIZ
app.get('/', function (req, res) {
    res.render('index.pug',{mensaje: 'Entregable 5 - PUG'});    
})

// INGRESAR UN PRODUCTO
router.post('/',(req,res)=>{
    let agregar = req.body;
    console.log('Producto a agregar:\n',agregar);
    let newId = contenedor.save(agregar);
    res.redirect('back');
})

// MOSTRAR TODOS LOS PRODUCTOS
router.get('/',(req,res)=>{
    let array = () => contenedor.getAll();
    if (array().length == 0){
        res.render('sindatos.pug');
    } else {
        console.log('Todos los productos disponibles:\n',array());
        res.render('all.pug', {array: array()});
    }
    
})

// LEVANTAR EL SERVIDOR
const server = app.listen(PORT, err => {
    if(err) throw new Error(`Error en servidor ${err}`);
    console.log("Aplicacion express escuchando en el puerto " + server.address().port);
});