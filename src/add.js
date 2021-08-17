const getItems = require('./helpers');

if (typeof sharedItems === 'undefined') {
  throw new Error('You have to import items first!');
}

const items = getItems();

const updatedItems = sharedItems.map(item => {
  // Check if we already have the item in trolley
  const existingItem = items.find(trolleyItem => trolleyItem.product.id === item.id);
  if (existingItem) {
    //TODO We can't handle different units
    if (existingItem.customerUnitChoice !== item.unit) {
      throw new Error(`Incompatible units! - ${item.id}`);
    }

    return {
      id: item.id,
      newValue: item.quantity + existingItem.quantity,
      oldValue: existingItem.quantity,
      newUnitChoice: item.unit,
      oldUnitChoice: item.unit
    };
  } else {
    return {
      id: item.id,
      newValue: item.quantity,
      oldValue: 0,
      newUnitChoice: item.unit,
      oldUnitChoice: item.unit
    };
  }
})


const csrf = document.querySelector('body').dataset.csrfToken;

const opts = {
  method: 'PUT',
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'x-csrf-token': csrf
  },
  body: JSON.stringify({
    items: updatedItems,
    returnUrl: '/groceries/cs-CZ/trolley'
  })
}

fetch('/groceries/cs-CZ/trolley/items?_method=PUT', opts);
