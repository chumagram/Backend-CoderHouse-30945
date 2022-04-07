// Dado un numero debolver su tabla de multiplicar completa

function tabla(num){
    let resultado = '';
    console.log(` Tabla del ${num}: `);
    for (let i = 1; i < 11; i++) {
        resultado = resultado + `\n ${i} X ${num} = ${(i)*num}`;
    }
    return resultado;
}
console.log(tabla(2));