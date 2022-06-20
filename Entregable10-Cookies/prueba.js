let timeToExpire = Date.now() + 5000;
let dateActual;

setInterval(() => {
    dateActual = Date.now();
    console.log(dateActual, timeToExpire)
    
    if(dateActual >= timeToExpire){
        console.log('**************************');
        clearInterval(contToExpire);
    }
},1000)
