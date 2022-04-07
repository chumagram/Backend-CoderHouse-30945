class Usuario{
    constructor(name,lastname,books=[{nombre:'',autor:''}],pets=[]){
        this.nombre = name;
        this.apellido = lastname;
        this.libros = books;
        this.mascotas = pets;
    }
    getFullName(){ //Metodo que devuelve un string con el nombre completo del usuario
        let str = `${this.nombre} ${this.apellido}`;
        return str;
    }
    addMascota(str){ //Metodo que agrega un string (mascota nueva) a la lista de mascotas
        this.mascotas.push(str);
    }
    countMascotas(){ //Metodo que devuelve la cantidad de mascotas del usuario
        let num = this.mascotas.length;
        return num;
    }
    addBook(str1,str2){
        this.libros.push({nombre: str1, autor: str2});
    }
    getBookNames(){
        //Así lo hizo la Profe: return this.libros.map(el => el.nombre);
        let arrayLibros = [];
        this.libros.forEach(function(element) {
            return arrayLibros.push(element.nombre);
        });
        return arrayLibros;
    }
}

const u1 = new Usuario('Pepe','Argento',[{nombre:'Inteligencia Emocional',autor:'Daniel Goleman'},{nombre:'Himno', autor:'Ayn Rand'}],['Irú','Karoma']); //Creación del usuario

console.log('Nombre completo:',u1.getFullName());

u1.addMascota('Prometeo'); //Añadir una mascota a la lista de mascotas

console.log('Cantidad de mascotas:',u1.countMascotas());

u1.addBook('Fundación','Isaac Asimov'); //Añador un libro al objeto de libros del usuario

console.log('Lista de Libros del Usuario:',u1.getBookNames());