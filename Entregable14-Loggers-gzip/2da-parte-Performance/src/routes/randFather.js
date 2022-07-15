function numRandRoute (req,res) {

    let number
    let randomNumbers = {};

    if(req.query.cant){
        number = parseInt(req.query.cant)
    } else number = 10000;

    for(let i = 0; i < number; i++){
		let random = Math.floor(Math.random() * 1000);
        if(randomNumbers[random]){
            randomNumbers[random]++;
        } else {
            randomNumbers[random] = 1;
        }
	}
    console.log(randomNumbers)
    res.send(randomNumbers);
}

module.exports = {numRandRoute}