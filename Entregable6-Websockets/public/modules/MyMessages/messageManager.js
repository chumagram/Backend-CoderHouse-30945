const fs = require('fs');

class Historial {
    constructor(){
        this.JSONcheck();
    }

    static messagesHistory = __dirname + '/messagesHistory.json';

    JSONcheck(){
        try {
            fs.readFileSync(Historial.messagesHistory,'utf-8');
            console.log('messagesHistory.json encontrado');
        } catch (error) {
            fs.writeFileSync(Historial.messagesHistory,[]);
            console.log('messagesHistory.json creado con exito!');
        }
    }

    addMessage(object){
        const date = new Date();
        const actual = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        let array = JSON.parse(fs.readFileSync(Historial.messagesHistory, 'utf-8'));
        object = Object.assign(object,{ time: actual })
        array.push(object);
        try {
            fs.writeFileSync(Historial.messagesHistory, JSON.stringify(array, null, 2));
            console.log(`Mensaje de ${object.email} añadido al historial`);
        } catch(error) {
            console.log('Error: no se pudo agregar el mensaje');
        }
    }

    allMessages(){
        let todo, flag;
        try {
            todo = JSON.parse(fs.readFileSync(Historial.messagesHistory, 'utf-8'));
            flag = true;
        } catch (error) {
            flag = false;
        }
        if (flag === true){
            return todo;
        } else if (flag === false){
            return 'error al mostrar todos los objetos';
        }
    }

    deleteMessages(){
        const arrayVacio = [];
        try {
            fs.writeFileSync(Historial.messagesHistory, JSON.stringify(arrayVacio));
            console.log('Todos los mensajes en',Historial.messagesHistory,'fueron borrados');
        } catch (error) {
            console.log('Error al borrar el historial de mensajes');
        }
    }
}

let mensajes = new Historial();

const newMensaje = {
    email: "entregable6@gmail.com",
    message: "¡Bienvenido al chat del Entregable 6!"
};

//mensajes.addMessage(newMensaje);
//mensajes.deleteMessages();
//console.log(mensajes.allMessages());

module.exports = mensajes;