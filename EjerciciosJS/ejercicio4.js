// Dada una cadena de texto, darle la vuelta e invertir el orden de sus caracteres, sin usar métodos propios del lenguaje, solo estructuras de control.

function darvuelta(str){
    let strInv = '';
    let j = str.length-1;
    for(indice in str){
        strInv += str[j];
        j--;
    }
    return strInv
}
console.log(darvuelta('ABCDEFG'));

function darvueltasimple(str){
    let invertido = '';
    for(let letra of str){
        invertido = letra + invertido;
    }
    console.log(invertido);
}
darvueltasimple('Hola Tulio');