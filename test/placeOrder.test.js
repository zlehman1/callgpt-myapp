const placeOrder = require('../functions/placeOrder');

test('Expect placeOrder to return an object with a price and order number', async () => {
  const order = await placeOrder({model: 'airpods pro', quantity: 10});

  expect(order).toHaveProperty('orderNumber');
  expect(order).toHaveProperty('price');
});
