// Dada una palabra, buscarla en una frase y devolver cuantas veces aparece. La frase y la palabra deben ser parametros de una función

function coincidencias(frase,busqueda){
    let fraselimpia = frase.toLowerCase().replace(/[^\w\s-ñ]/gi,'').split(' '); 
    // Entre [] se ecuentra una expresion regular. Con ^ significa negado, luego \W significa todo el alfabeto pero no el español sino que el ingles; luego el \s es para los espacios y finalmente -ñ significa que no seleccione la letra ñ para eliminar. el "g" hace que se aplique la consigna todo el string, sino solo se aplica al primer caracter del string. "i" significa indistinto para mayusculas o minusculas. ANANNNNNANANANANANANAN
    let cont = 0;
    fraselimpia.forEach(element => {
        if (element == busqueda){
            cont ++;
        }
    });
    return cont;
}

console.log(coincidencias('HOLA señor kiosquero, vengo en busca de su DINERO, ponga las manos arriba; y preste mucha ATENCION!. Mi familia no tiene trabajo... y yo TRABAJAR, no quiero.','y'));