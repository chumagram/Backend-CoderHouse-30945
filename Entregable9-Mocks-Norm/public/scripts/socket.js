const socket = io.connect();

// Esquemas de normalizacion
const authorSchema = new normalizr.schema.Entity('authorSchema');
const messageSchema = new normalizr.schema.Entity('messageSchema', {
    commenter: authorSchema
})
const chat = new normalizr.schema.Entity('chats', {
    comments: [messageSchema],
    author: authorSchema
})

// FUNCIONES DE SOCKET
function render(data) {
    const html = data.map((element) => {
        return(`<tr>
            <td>${element.id}</td>
            <td>${element.title}</td>
            <td>${element.price}</td>
            <td><img class="imgProducto" src=${element.thumbnail} alt="imagen de ${element.title}"></td>
        </tr>`)
    }).join(" ");
    document.getElementById('tablaProductos').innerHTML = html;
}

function renderCompression(data,denormalizeData){
    let normalizado = JSON.stringify(data).length;
    let original = JSON.stringify(denormalizeData).length;
    let compression = 100 - (( normalizado * 100 ) / original);
    const html = `COMPRESIÓN: <em>${compression.toFixed(3)} %</em>`;
    document.getElementById('compression').innerHTML = html;
}

function renderMessage(data) {
    let denormalizeData = normalizr.denormalize(data.result, [chat], data.entities);
    const html = denormalizeData.map((element) => {
        return(`
        <table id="tablaMSJ">
            <tr>
                <td rowspan="2"><img class="avatarImg" src=${element.author.avatar} alt="${element.author.alias}"></td>
                <td class="timeAndId"><p>${element.time} ~ <strong>${element.author.id}</strong></p></td>
            </tr>
            <tr>
                <td><p>- <em>${element.text}</em></p></td>
            </tr>
        </table>
        `)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
    renderCompression(data,denormalizeData);
}

function addProduct(e){
    const producto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    };
    console.log(producto);
    socket.emit('new-product', producto);
    return false;
}

function addMessage(e){
    const mensaje = {
        id: document.getElementById('id').value,
        text: document.getElementById('message').value
    };
    socket.emit('new-message', mensaje);
    return false;
}

function addNewUser(e){
    const mensaje = {
        id: 999999,
        author:{
            id: document.getElementById('mail').value,
            name: document.getElementById('name').value,
            lastName: document.getElementById('lastName').value,
            age: document.getElementById('age').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: document.getElementById('text').value
    };
    socket.emit('new-user', mensaje);
    return false;
}

socket.on('productos', data => {
    render(data);
});

socket.on('mensajeria', data => {
    renderMessage(data);
});