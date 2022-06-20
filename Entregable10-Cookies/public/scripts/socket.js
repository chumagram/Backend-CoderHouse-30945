// Llamamos a socket.io
const socket = io.connect();
// COOKIE DEL USUARIO (contiene id/mail y alias)
let cookieValue;
//let cookieTime;
// Tiempo para que expire la sesion en segundos (600 seg = 10 min)
let timeToExpire = 30; 

function readUserCookie(cookieToRead){
    cookieToRead = document.cookie
    .split('; ')
    .find(row => row.startsWith('session='))
    ?.split('=')[1];
    cookieToRead = JSON.parse(cookieToRead);
    return cookieToRead;
}

//*__________________ ESQUEMAS DE NORAMALIZACION __________________

const authorSchema = new normalizr.schema.Entity('authorSchema')
const messageSchema = new normalizr.schema.Entity('messageSchema',{commenter: authorSchema})
const chat = new normalizr.schema.Entity('chats', {
    comments: [messageSchema],
    author: authorSchema
})

//*_______________________ INICIO DE SESION ______________________

// Primero se verifica la sesión
try { // el try es valido si hay sesión de expiración y usuario
    
    // Leemos la cookie para la expiracion
    let cookieTime = document.cookie
    .split('; ')
    .find(row => row.startsWith('timeToExp='))
    ?.split('=')[1];
    cookieTime = JSON.parse(cookieTime);
    
    // Leemos la cookie del usuario
    cookieValue = readUserCookie(cookieValue);
    
    // Verifica que en realidad la sesión esta iniciada con Mongo
    setTimeout(() => {
        socket.emit('session-status', cookieValue.id)
        socket.on('res-session-status', data => {
            if(data == false){
                logout();
                let myCookie = `timeToExp=''; SameSite=Lax; Secure; max-age=0`;
                document.cookie = myCookie;
            }
        })
    }, 500);

    renderSession(cookieValue, false);

} catch (error){ // Si ya no existe la cookie de persistencia

    console.log({error: `no se encontró sesión iniciada: ${error}`});
    // Solo entra al if si existe sesión de usuario pero no de expiración
    if(document.cookie){
        // Leemos la cookie del usuario
        cookieValue = readUserCookie(cookieValue);
        // Enviar el email al backend para cerrar sesión en Atlas
        socket.emit('close-session', cookieValue.id);
        // Borrar la cookie de inicio de sesión
        let deleteCookie = `session=''; SameSite=Lax; Secure; max-age=0`;
        document.cookie = deleteCookie;
    }
}

// Funcion que se ejecuta cuando se hace click en el botón "INICIAR SESIÓN"
function login(e){
    const emailSend = document.getElementById('email').value;
    socket.emit('init-session', emailSend);
}

// Funcion que se ejecuta cuando se hace click en la "X"
function ocultarErrSession(e){
    document.querySelector('#errInitSession').style.display = 'none';
    document.querySelector('#atenuarErr').style.display = 'none';
}

// Funcion que se ejecuta desde el socket de inicio de sesión
function renderSession(data,flag = true){
    if (data.error) {// Si se pasa mal el mail, muestra cartel emergente 
        document.querySelector('#errInitSession').style.display = 'block';
        document.querySelector('#atenuarErr').style.display = 'block';
    } else {
        // La sesion se inicia de forma correcta
        document.querySelector('#formInicioS').style.display = 'none';
        document.querySelector('#logout').style.display = 'block';
        document.querySelector('#logout').style.display = 'inline';

        // Crea cookie que contiene el usuario el email/id
        let myCookie = `session={"id": "${data.id}", "alias": "${data.alias}"}; SameSite=Lax; Secure;`;
        document.cookie = myCookie;

        // Crea cookie para inactividad 
        let createCookieTime = `timeToExp=true; SameSite=Lax; Secure; max-age=${timeToExpire}`;
        document.cookie = createCookieTime;

        if(flag == true){ // Si se la sesión no estaba iniciada (no exisitia la cookie)

            //Mostar cartel de bienvenida
            let html = `Bienvenido ${data.alias}`
            document.getElementById('saludos').textContent = html;
            document.querySelector('#hechoInitSession').style.display = 'block';

            // Oculta el cartel de bienvenida luego de 5 segundos
            setTimeout(() => {
                document.querySelector('#hechoInitSession').style.display = 'none';
            }, 5000);
        }
    }
}

//*_______________________ CIERRE DE SESIÓN _______________________

function logout(e) {

    // Extrae los valores de la cookie
    cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('session='))
    ?.split('=')[1];
    cookieValue = JSON.parse(cookieValue)
    
    let html = `Hasta luego ${cookieValue.alias}`
    document.getElementById('despedida').textContent = html;

    document.querySelector('#logout').style.display = 'none';
    document.querySelector('#despedida').style.display = 'block';
    document.querySelector('#atenuarBye').style.display = 'block';
    document.querySelector('#closeSession').style.display = 'block';
    document.querySelector('#formInicioS').style.display = 'block';
    document.querySelector('#email').value = '';
    
    setTimeout(() => {
        document.querySelector('#despedida').style.display = 'none';
        document.querySelector('#atenuarBye').style.display = 'none';
        document.querySelector('#closeSession').style.display = 'none';
    }, 2000);

    // Enviar el email al backend para que setee la sesion cerrada en Atlas
    socket.emit('close-session', cookieValue.id);

    // Borrar la cookie
    let deleteCookie = `session=''; SameSite=Lax; Secure; max-age=0`;
    document.cookie = deleteCookie;
}

//*______________________ SOBRE LOS PRODUCTOS ______________________

function render(data) {
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
    console.log(producto);
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
    let compression = 100 - (( normalizado * 100 ) / original);
    const html = `COMPRESIÓN: <em>${compression.toFixed(3)} %</em>`;
    document.getElementById('compression').innerHTML = html;
}
function addMessage(e){
    timeToExpire = Date.now() + 10000;
    const mensaje = {
        text: document.getElementById('message').value
    };
    socket.emit('new-message', mensaje);
    return false;
}

//*______________________ SOBRE LOS USUARIOS ______________________

function mostrarCrearUsuario(e){
    document.querySelector('#formRegistrarse').style.display = 'block';
    document.querySelector('#atenuar').style.display = 'block';
}
function ocultarCrearUsuario(e){
    document.querySelector('#formRegistrarse').style.display = 'none';
    document.querySelector('#atenuar').style.display = 'none';
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

//*________________________ SOCKETS ________________________

socket.on('productos', data => {
    render(data);
});
socket.on('mensajeria', data => {
    renderMessage(data);
});
//Socket de inicio de sesión
socket.on('res-session', data => {
    renderSession(data);
});