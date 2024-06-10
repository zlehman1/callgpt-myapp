const checkPrice = require('../functions/checkPrice');

test('Expect Airpods Pro to cost $249', async () => {
  expect(await checkPrice({model: 'airpods pro'})).toEqual({ price: 249 });
});

test('Expect Airpods Max to cost $549', async () => {
  expect(await checkPrice({model: 'airpods max'})).toEqual({ price: 549 });
});

test('Expect all other models to cost $149', async () => {
  expect(await checkPrice({model: 'anything'})).toEqual({ price: 149 });
});
