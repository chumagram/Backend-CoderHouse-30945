const fs = require('fs');

class Contenedor {

    constructor(nameArchivo){
        this.dir = __dirname + "/" + nameArchivo;
        this.JSONcheck();
        this.lastID;
    }

    static workArchive = __dirname + '/archivoWork.json';

    JSONcheck(){
        let str;
        try {
            str = fs.readFileSync(Contenedor.workArchive,'utf-8');
            console.log(Contenedor.workArchive,'encontrado');
        } catch (error) {
            str = fs.readFileSync(this.dir,'utf-8');
            fs.writeFileSync(Contenedor.workArchive,str);
            console.log(Contenedor.workArchive,'creado con exito!');
        }

/* a continuacion se lee el ID mayor en el archivoTest pasado al crear la clase. Luego 
guarda ese ID en lastID para su posterior uso en los demás módulos. */

        let array = JSON.parse(str);
        let idAux = [];
        array.forEach(element => {
            idAux.push(element.id);
        });
        this.lastID = Math.max(...idAux);
        if(this.lastID === -Infinity){
            this.lastID = 0;
            console.log(Contenedor.workArchive,' está vacío');
        } else {
            console.log(`ID mayor del archivo ingresado: ${this.lastID}`);
        }
    }

    save(object){
        let array = JSON.parse(fs.readFileSync(Contenedor.workArchive, 'utf-8'));
        this.lastID ++
        object.id = this.lastID;
        array.push(object);
        try {
            fs.writeFileSync(Contenedor.workArchive, JSON.stringify(array, null, 2));
            console.log(`${object.title} añadido a ${Contenedor.workArchive}`);
        } catch(error) {
            console.log('Error: no se pudo guardar el objeto');
        }
        console.log(`ID asignado para ${object.title}: ${object.id}`);
        return object.id;
    }

    getById(number){
        let objectAux;
        let array = JSON.parse(fs.readFileSync(Contenedor.workArchive, 'utf-8'));
        array.forEach( item => {
            if(item.id == number){
                objectAux = item;
            }
        });
        if(objectAux === undefined){
            console.log(`El ID ${number} no existe.`);
            return { error : 'producto no encontrado' }
        } else {
            console.log('Objeto solicitado: \n',objectAux);
            return objectAux;
        }
    }

    getAll(){
        let todo, flag;
        try {
            todo = JSON.parse(fs.readFileSync(Contenedor.workArchive, 'utf-8'));
            flag = true;
        } catch (error) {
            flag = false;
        }
        if (flag === true){
            return todo;
        } else if (flag === false){
            return 'error con al mostrar todos los objetos';
        }
    }

    deleteById(number){
        let array = JSON.parse(fs.readFileSync(Contenedor.workArchive, 'utf-8'));
        let idObject = array.findIndex(object => object.id === number);
        if (idObject === -1){
            console.log('El indice indicado no existe');
            return { error : 'producto no encontrado' }
        } else {
            array.splice(idObject, 1);
            fs.writeFileSync(Contenedor.workArchive, JSON.stringify(array, null, 2));
            console.log(`El objeto con ID ${number} fue eliminado exitosamente.`);
            return { hecho : `El objeto con ID ${number} fue eliminado exitosamente.` }
        }
    }

    deleteAll(){
        const arrayVacio = [];
        try {
            fs.writeFileSync(Contenedor.workArchive, JSON.stringify(arrayVacio));
            console.log('Todos los objetos en',Contenedor.workArchive,'fueron borrados');
        } catch (error) {
            console.log('Error: no se pudo borrar los datos');
        }
    }

    updateById(numero, objeto){
        let array = JSON.parse(fs.readFileSync(Contenedor.workArchive, 'utf-8'));
        let indexObj = array.findIndex(element => element.id === numero);
        if (indexObj === -1){
            return { error : 'producto no encontrado' }
        } else {
            objeto.id = numero;
            array[indexObj] = objeto;
            fs.writeFileSync(Contenedor.workArchive, JSON.stringify(array,null,2));
            return objeto;
        }
    }
}

let libreria = new Contenedor('productos.json');

let newProducto1 = {
    title: "lapiz",
    price: 20,
    thumbnail: "google.com/img_lapiz"
}

let newProducto2 = {
    title: "cartulina",
    price: 80,
    thumbnail: "google.com/img_cartulina"
}

// Uso del método "save"
//libreria.save(newProducto2);

// Uso del método getById
//libreria.getById(19);

// Uso del método getAll
//libreria.getAll();

// Uso del método deleteById
//libreria.deleteById(1);

// Uso del método deleteAll
//libreria.deleteAll();

// Uso del método updateById
//libreria.updateById(1,newProducto2)

module.exports = libreria;