/* RECUPERATORIO DEL ENTREGABLE 2 -- Alumno: Gramajo, Gonzalo Leonel
la clase no modificará el archivo que se le pasa inicialmente (archivoTest.json), 
sino que creara un nuevo archivo llamado archivoWork.json con el que trabajará.
el archivoWork2.json fue creado con la finalidad de realizar un segundo testeo con 
otros parámetros. */

const fs = require('fs'); // llama a file system

class Contenedor {

    constructor(nameArchivo){
        this.dir = "./" + nameArchivo;
        this.JSONcheck();
        this.lastID;
    }

    static workArchive = './archivoWork.json';

/* JSONcheck es un Immediately Invoked Class Expression que verifica si exite el 
archivoWork.json, sino lo crea y lo iguala al archivo que se paso como parametro al 
crear la clase (archivoTest.json). */
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
            return console.log(`El ID ${number} no existe.`);;
        } else {
            console.log('Objeto solicitado: \n',objectAux);
            return objectAux;
        }
    }

    async getAll(){
        let todo, flag;
        try {
            todo = JSON.parse(await fs.promises.readFile(Contenedor.workArchive, 'utf-8'));
            //para que se muestre el error probar con:
            //todo = JSON.parse(await fs.promises.readFile('./archivoEquivocado.txt', 'utf-8'));
            flag = true;
        } catch (error) {
            flag = false;
        }
        if (flag === true){
            console.log('Lista completa de objetos:\n',todo);
            return todo; // si bien devuelve, tambien lo muestra por consola
        } else if (flag === false){
            console.log('error con al mostrar todos los objetos');
        }
    }

    deleteById(number){
        let array = JSON.parse(fs.readFileSync(Contenedor.workArchive, 'utf-8'));
        let idObject = array.findIndex(object => object.id === number);
        if (idObject === -1){
            console.log('El indice indicado no existe');
        } else {
            array.splice(idObject, 1);
            fs.writeFileSync(Contenedor.workArchive, JSON.stringify(array, null, 2));
            console.log(`El objeto con ID ${number} fue eliminado exitosamente.`);
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
}

// Creación de una clase Contenedor llamada libreria
//let libreria = new Contenedor('archivoTest.json');
// Para probar con una lista vacía:
let libreria = new Contenedor('archivoTestVacio.json'); 

// Productos nuevos para pasarle al método save
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
libreria.save(newProducto2);

// Uso del método getById
//libreria.getById(19);

// Uso del método getAll
//libreria.getAll();

// Uso del método deleteById
//libreria.deleteById(1);

// Uso del método deleteAll
//libreria.deleteAll();