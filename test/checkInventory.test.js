const checkInventory = require('../functions/checkInventory');

test('Expect Airpods Pro to have 10 units', async () => {
  expect(await checkInventory({model: 'airpods pro'})).toBe('{"stock":10}');
});

test('Expect Airpods Max to have 0 units', async () => {
  expect(await checkInventory({model: 'airpods max'})).toBe('{"stock":0}');
});

test('Expect all other values to have 100 units', async () => {
  expect(await checkInventory({model: 'anything'})).toBe('{"stock":100}');
});
