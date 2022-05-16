# CONSULTAS

## LADO DEL SERVIDOR
**Paso 1-***Inicializa MONGO en la carpeta eCommerce:*
mongod --dbpath "C:\Users\Gonzalo\Documents\Backend\MyBackend\Clases\Clase17-MongoDB\miBaseMongo"

## LADO DEL CLIENTE
**Paso 2 -***inicializamos un cliente para Mongo en la carpeta eCommerce:*
mongo
**Paso 3 -***Crear la base de datos eCommerce*
use eCommerce
**Paso 4 -***Creamos las colecciones Productos y Mensajes*
db.createCollection("Mensajes")
db.createCollection("Productos")

**Consigna 1.1 y 2.1 -***Insertar 10 documentos en la colección Mensajes con sus ID autogenerados:*
db.mensajes.insertMany([ "ver: mensajes.json" ])
**Consigna 1.2 y 2.2 -***Insertar 10 documentos en la colección Productos con sus ID autogenerados:*
db.productos.insertMany([ "ver: productos.json" ])

**Consigna 3.1 -***Listar la colección Mensajes:*
db.mensajes.find().pretty()
**Consigna 3.2-***Listar la colección Productos:*
db.productos.find().pretty()

**Consigna 4.1-***Mostrar la cantidad de documentos almacendados en Mensajes*
db.mensajes.estimatedDocumentCount()
**Consigna 4.2-***Mostrar la cantidad de documentos almacendados en Productos*
db.productos.estimatedDocumentCount()

**Consigna 5.a-***Insertar un producto en la coleccion Productos:*
db.productos.insertOne({"name":"Pepas de Batata","price":678,"thumbnail":"http://www.pepasdebatata.com/","stock":6789,"description":"La mejor forma de acompañar tus mates"})

**Consigna 5.b-***Realizar una consulta en la coleccion productos:*
    **I-***Listar los productos de menos de $1000:*
    db.productos.find({price:{$lt:1000}})
    **II-***Listar los productos con precio entre 1000 y 3000 pesos:*
    db.productos.find({$and:[{price:{$gt:1000,}},{price:{$lt:3000}}]})
    **III-***Listar los productos mayores a $3000:*
    db.productos.find({price:{$gt:3000}})
    **IV-***Traer el nombre del tercer producto mas barato:*
    db.productos.find({},{name:1,_id:0}).sort({price:1}).skip(2).limit(1)
**Consigna 5.c-***Realizar una actualización con stock de 100 a los productos:*
db.productos.updateMany({},{$set:{"stock":100}})
**Consigna 5.d-***Actualizar stocka 0 si el precio es de mas de 4000*
db.productos.updateMany({price:{$gt:4000}},{$set:{"stock":0}})
**Consigna 5.e-***Borrar los productos con precio menor a 1000 pesos*
db.productos.deleteMany({price:{$lt:1000}})

**Consigna 6-***Crear usuario PEPE:*
* Nos cambiamos a la database ADMIN
use admin
* Ahora si creamos el usuario PEPE
db.createUser({user: 'pepe',pwd:'asd456',roles:[{role:'read',db: 'eCommerce'}]})
* Para acceder como PEPE, en una nueva ventana:
mongo -u pepe -p asd456