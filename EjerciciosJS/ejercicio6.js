// dibujar un cuadrado hecho de asteriscos

function asterisco(num){
    for(let j = 0; j < num; j++){
        if (j==0 || j == num-1){
            let unAsterisco = '*';
            console.log(unAsterisco.repeat(num));
        } else {
            let lados = '';
            let y = '';
            for(let k = 0; k < num; k++){
                if (k == 0 || k == num-1){
                    lados = '*';
                } else {
                    lados = ' ';
                }
                y += lados;
            }
            console.log(y);
        }
    }
}
asterisco(10);