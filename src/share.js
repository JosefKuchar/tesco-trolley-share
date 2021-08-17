const getItems = require('./helpers');

const items = getItems();

console.log(items.map(item => {
    const url = `https://nakup.itesco.cz/groceries/cs-CZ/products/${item.product.id}`;
    const unit = item.customerUnitChoice === 'pcs' ? 'ks' : item.customerUnitChoice;
    return `${url} - ${item.quantity} ${unit}`;
}).join('\n'));

console.log('const sharedItems = ' + JSON.stringify(items.map(item => ({
    quantity: item.quantity,
    unit: item.customerUnitChoice,
    id: item.product.id
}))));
