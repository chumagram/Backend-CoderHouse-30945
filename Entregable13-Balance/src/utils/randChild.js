let randomNumbers = {};

process.on('message', function (data) {

    console.log(`Message from father: ${data}`);

    for(let i = 0; i < data; i++){
		let random = Math.floor(Math.random() * 1000);
        if(randomNumbers[random]){
            randomNumbers[random]++;
        } else {
            randomNumbers[random] = 1;
        }
	}
    process.send(JSON.stringify(randomNumbers));
});