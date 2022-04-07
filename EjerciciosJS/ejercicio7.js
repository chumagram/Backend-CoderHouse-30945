// Dados 2 numeros, devolver cuantos numeros Impares hay entre ellos

function imparEntre (num1, num2) {
    let cont = 0;
    for (let i = num1+1; i < num2; i++) {
        if (i%2 == 1){
            cont ++;
        }
    }
    return console.log(`la cantidad de numeros impares entre ${num1} y ${num2} es ${cont}`);
}
imparEntre(-45,454);