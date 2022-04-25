const socket = io.connect();

function render(data) {
    const html = data.map((element) => {
        return(`<tr>
            <td>${element.title}</td>:
            <td>${element.price}</td>
            <td><img src=${element.thumbnail} alt="imagen de ${array.title}"></td>
        </tr>`)
    }).join(" ");
    document.getElementById('array').innerHTML = html;
}

function addMessage(e){
    console.log("NOOOOO"); 
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    // envia el nuevo mensaje al servidor:
    socket.emit('new-message', mensaje);
    return false;
}

// Recibir el array desde el servidor
socket.on('array', data => {
    render(data);
})