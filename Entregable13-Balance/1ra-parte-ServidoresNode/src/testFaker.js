let faker = require('faker');
faker.locale = 'es';
const { commerce, image } = faker;
function newProductsFaker(){
    let arrFaker = [];
    for (let i = 0; i < 5; i++) {
        let objAux = {
            id: i+1,
            title: commerce.productName(true),
            price: commerce.price(true),
            thumbnail: image.imageUrl(640, 640, 'cat', true),
        };
        arrFaker.push(objAux);
    }
    return arrFaker;
}

module.exports = newProductsFaker();