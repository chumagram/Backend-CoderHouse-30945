/* 
>> Consigna: Realizar un proyecto de servidor basado en node.js y express que
ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes
rutas:
● GET '/api/productos' -> devuelve todos los productos.
● GET '/api/productos/:id' -> devuelve un producto según su id.
● POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id
asignado.
● PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
● DELETE '/api/productos/:id' -> elimina un producto según su id.

- Para el caso de que un producto no exista, se devolverá el objeto:
{ error : 'producto no encontrado' }
- Implementar la API en una clase separada, utilizando un array como soporte de
persistencia en memoria.
- Incorporar el Router de express en la url base '/api/productos' y conﬁgurar todas las
subrutas en base a este.
- Crear un espacio público de servidor que contenga un documento index.html con un
formulario de ingreso de productos con los datos apropiados.
- El servidor debe estar basado en express y debe implementar los mensajes de conexión
al puerto 8080 y en caso de error, representar la descripción del mismo.
- Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a
través de Postman y del formulario de ingreso.
*/

const contenedor = require('./scrips/container.js'); // llamamos al contenedor
const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT,()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/api/productos',(require,response)=>{
    let array = contenedor.getAll();
    console.log('Todos los productos disponibles:\n',array);
    response.json(array);
})

app.get('/api/productos/:id',(require,response)=>{
    let objeto = contenedor.getById(parseInt(require.params.id));
    console.log('Producto solicitado:\n',objeto);
    response.json(objeto);
})

app.post('/api/productos',(require,response)=>{
    let agregar = require.body;
    console.log('Producto a agregar:\n',agregar);
    let newId = contenedor.save(agregar);
    response.send(`Id del producto agregado:${newId.toString()}`);
})

app.put('/api/productos/:id',(require,response)=>{
    let id = require.params.id;
    let actualizar = require.body;
    let newObject = contenedor.updateById(id,actualizar);
    console.log('Objeto actualizado:\n',newObject);
    response.json({'Objeto actualizado': newObject});
})

app.delete('/api/productos/:id',(require,response)=>{
    let id = require.params.id;
    contenedor.deleteById(id);
    let str = `El producto con id ${id} fue eliminado con éxito`
    response.send(str);
})