const express = require('express');
const contenedor = require('./public/scripts/container.js');
const handlebars = require('express-handlebars');
const {Router} = express;

const app = express();
const PORT = 8080;
const router = Router();

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials/"
    })
);

app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/productos', router);
app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/public'));

/******FIN DE LAS CONFIGURACIONES******/


app.get('/', function (req, res) {
    res.render('main');    
})
//{ suggestedChamps: fakeApi(), listExists: true }

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
    console.log('Todos los productos disponibles:\n',array);
    res.render('all', { TodosLosProductos: array(), listExists: true });
})

router.get('/:id',(require,response)=>{
    let objeto = contenedor.getById(parseInt(require.params.id));
    console.log(objeto);
    response.json(objeto);
})

router.put('/:id',(require,response)=>{
    let id = require.params.id;
    let actualizar = require.body;
    let newObject = contenedor.updateById(id,actualizar);
    console.log('Objeto actualizado:\n',newObject);
    response.json({'Objeto actualizado': newObject});
})

router.delete('/:id',(require,response)=>{
    let id = require.params.id;
    let str = contenedor.deleteById(id);
    response.json(str);
})

// LEVANTAR EL SERVIDOR
const server = app.listen(PORT, err => {
    if(err) throw new Error(`Error en servidor ${err}`);
    console.log("Aplicacion express escuchando en el puerto " + server.address().port);
});