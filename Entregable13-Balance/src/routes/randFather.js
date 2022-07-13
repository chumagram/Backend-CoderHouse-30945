const {fork} = require('child_process');
let number

function forkRandRoute (req,res) {
    if(req.query.cant){
        number = parseInt(req.query.cant)
    } else number = 10000;
    
    console.log('Forking a new subprocess... cant = ',number)
    const child = fork('./src/utils/randChild.js');
    child.send(number);

    child.on('message', (message) => {
        res.send(`${message}`);
    });
}

module.exports = {forkRandRoute}