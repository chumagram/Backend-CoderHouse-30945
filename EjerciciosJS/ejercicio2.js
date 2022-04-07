//palindromo(otto) devuelve true. Si no es palindromo devuelve false.

function palindromo(str){
    let strInv = '';
    for (let i = (str.length) - 1 ; i >= 0; i--) {
        strInv+=str[i];
    }
    if (strInv == str) {
        return true;
    }
    else return false;
}

function palindromo2(str){
    strInv = str.split('').reverse().join('');
    return (strInv === str);
}

console.log(palindromo('ana'));
console.log(palindromo2('neuquen'));