const fs = require('fs'); // llama a file system

// Objeto a usar (es el almacen de una librería)
let almacen = [{
  title: 'libreta',
  price: 781,
  thumbnail: 'google.com/img_libreta',
  id: 1
},{
  title: 'Resaltador',
  price: 654,
  thumbnail: 'google.com/img_resaltador',
  id: 2
}];

let id_historial = 2;

class Contenedor{
  constructor(nameArchivo){
    this.dir = "./" + nameArchivo  + ".txt"
  }
  
  save(object){
    try {
      object.id = id_historial + 1;
      almacen.push(object);
      fs.writeFileSync(this.dir, JSON.stringify(almacen, null, 2));
    } catch(error) {
      console.log('Error: no se pudo guardar el objeto');
    }

    return object.id;
  }

  getById(number){
    let object_temp;
    
    almacen.forEach( item => {
      if(item.id == number){
        object_temp = item;
      }
    });

    if(object_temp === undefined){
      return null;
    } else {
      return object_temp;
    }
  }

  getAll(){
    return almacen;
  }

  deleteById(number){
    let indexObject = almacen.findIndex(object =>
      object.id === number
    );

    if (indexObject === -1){
      console.log('El indice indicado no existe');
    } else {
      almacen.splice(indexObject, 1);
      fs.writeFileSync(this.dir, JSON.stringify(almacen, null, 2));
    }
  }

  deleteAll(){
    almacen = [];
    try {
        fs.writeFileSync(this.dir, JSON.stringify(almacen))
        console.log('Listo: Se borraron todos los datos');
    } catch (error) {
        console.log('Error: no se pudo borrar los datos');
    }
  }
}

let libreria = new Contenedor('productos'); // se crea la clase libreria
// agregar un objeto -> Boligoma
libreria.save({title: 'Boligoma',price: 1000, thumbnail: 'google.com/imagen_boligoma'});
// mostrar objeto mediante su ID
console.log(libreria.getById(3));
// mostrar todo el almacen (array de objetos)
console.log(libreria.getAll());
// elimnar el objeto con un ID determinado como parametro
libreria.deleteById(2);
// borrar todos los objetos del archivo
libreria.deleteAll();