// Llamamos a socket.io
const socket = io.connect();

//*__________________ ESQUEMAS DE NORAMALIZACION __________________

const authorSchema = new normalizr.schema.Entity('authorSchema')
const messageSchema = new normalizr.schema.Entity('messageSchema',{commenter: authorSchema})
const chat = new normalizr.schema.Entity('chats', {
    comments: [messageSchema],
    author: authorSchema
})

//*_______________ COMIENZO DE SESIÓN / ACTUALIZAR PÁGINA _______________

// FUNCIÓN: Extraer valores de cookie de usuario
function readCookieUser () {
    let cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('alias='))
    ?.split('=')[1];
    if (cookieValue == undefined) {
        return { error: 'user cookie not found'}
    } else {
        return cookieValue
    }
}

// FUNCIÓN: Leemos cookie de session
function readCookieSession () {
    let cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith("connect.sid="))
    ?.split('=')[1];
    if (cookieValue == undefined) {
        return { error: 'session cookie not found'}
    } else {
        return cookieValue
    }
}

// FUNCIÓN: saludar al usuario y mostrar logout
function renderSession(){
    let alias = readCookieUser()

    //Mostrar boton de logout
    document.querySelector('#logout').style.display = 'block';
    document.querySelector('#logout').style.display = 'inline';
    
    //Mostar cartel de bienvenida
    let html = `Bienvenido ${alias}`
    document.getElementById('saludos').textContent = html;
    document.querySelector('#hechoInitSession').style.display = 'block';

    // Oculta el cartel de bienvenida luego de 4 segundos
    setTimeout(() => {
        document.querySelector('#hechoInitSession').style.display = 'none';
    }, 4000);
}

// Verificación de sesión
let cookieSession = readCookieSession();

if (cookieSession.error){
    logout();
} else {
    renderSession(); // mostrar bienvenida y logout
}

//*_______________________ FINALIZAR SESIÓN _______________________

//FUNCIÓN: cerrar sesión
function logout(e) {
    let alias = readCookieUser()

    let html = `Hasta luego ${alias}`
    document.getElementById('despedida').textContent = html;

    // Borrar las cookies
    let deleteAlias = `alias=''; SameSite=Lax; Secure; max-age=0`;
    document.cookie = deleteAlias;
    let deleteEmail = `email=''; SameSite=Lax; Secure; max-age=0`;
    document.cookie = deleteEmail;

    document.querySelector('#closeSession').style.display = 'block';
    document.querySelector('#atenuarBye').style.display = 'block';

    setTimeout(() => {
        window.location.replace('http://' + window.location.host);
    }, 2000);
}

//*______________________ SOBRE LOS PRODUCTOS ______________________

function renderProduct(data) {
    const html = data.map((element) => {
        return(`<tr>
            <td>${element.title}</td>
            <td>${element.price}</td>
            <td><img class="imgProducto" src=${element.thumbnail} alt="imagen de ${element.title}"></td>
        </tr>`)
    }).join(" ");
    document.getElementById('tablaProductos').innerHTML = html;
}

function addProduct(e){
    const producto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    };
    socket.emit('new-product', producto);
    return false;
}

//*______________________ SOBRE LOS MENSAJES ______________________

function renderMessage(data) {
    let denormalizeData = normalizr.denormalize(data.result, [chat], data.entities);
    const html = denormalizeData.map((element) => {
        return(`
        <table id="tablaMSJ">
            <tr>
                <td rowspan="2"><img class="avatarImg" src=${element.author.avatar} alt="${element.author.alias}"></td>
                <td class="timeAndId"><p>${element.timeStamp} ~ <strong>${element.author.id}</strong></p></td>
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
function renderCompression(data,denormalizeData){
    let normalizado = JSON.stringify(data).length;
    let original = JSON.stringify(denormalizeData).length;
    let compression = ( normalizado * 100 ) / original;
    const html = `COMPRESIÓN: <em>${compression.toFixed(3)} %</em>`;
    document.getElementById('compression').innerHTML = html;
}
function addMessage(e){
    
    let emailUser = document.cookie
    .split('; ')
    .find(row => row.startsWith('email='))
    ?.split('=')[1];
    let username = emailUser.split('%')[0]
    let mailServer = emailUser.split('%')[1].slice(2)
    let mailClean = username + '@' + mailServer

    const mensaje = {
        email: mailClean,
        text: document.getElementById('message').value
    };

    socket.emit('new-message', mensaje);
    return false;
}

//*________________________ SOCKETS ________________________

socket.on('productos', data => {
    renderProduct(data);
});
socket.on('mensajeria', data => {
    renderMessage(data);
});