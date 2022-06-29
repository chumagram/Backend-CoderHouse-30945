//*______________________ ERRORES AL INICIAR SESIÓN ______________________

try {
    // Leemos la cookie de error en el mail
    let emailErr = document.cookie
    .split('; ')
    .find(row => row.startsWith("initErr="))
    ?.split('=')[1];

    if (emailErr) mostrarErrSession();

} catch (error){
    console.log(error)
}

function ocultarErrSession(e){
    document.querySelector('#errInitSession').style.display = 'none';
    document.querySelector('#atenuarErr').style.display = 'none';
}
function mostrarErrSession(e){
    document.querySelector('#errInitSession').style.display = 'block';
    document.querySelector('#atenuarErr').style.display = 'block';
}

//*______________________ ERRORES AL REGISTRARSE ______________________
try {
    // Leemos la cookie de error en el register
    let registerErr = document.cookie
    .split('; ')
    .find(row => row.startsWith("registerErr="))
    ?.split('=')[1];

    if (registerErr) mostrarErrRegister();

} catch (error){
    console.log(error)
}

function mostrarErrRegister(e){
    document.querySelector('#errRegister').style.display = 'block';
    document.querySelector('#atenuarErr').style.display = 'block';
}
function ocultarErrRegister(e){
    document.querySelector('#errRegister').style.display = 'none';
    document.querySelector('#atenuarErr').style.display = 'none';
}

//*______________________ FORMULARIO PARA REGISTRARSE ______________________

function mostrarCrearUsuario(e){
    document.querySelector('#formRegistrarse').style.display = 'block';
    document.querySelector('#atenuar').style.display = 'block';
}
function ocultarCrearUsuario(e){
    document.querySelector('#formRegistrarse').style.display = 'none';
    document.querySelector('#atenuar').style.display = 'none';
}