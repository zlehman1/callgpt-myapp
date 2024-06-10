/* global jest */

require('dotenv').config();
const setTimeout = require('timers/promises').setTimeout;
const transferCall = require('../functions/transferCall');

jest.mock('twilio', () => {
  return function() {
    return {
      calls: {
        create: jest.fn().mockResolvedValue({ sid: 'CA34995af316a19c4052e00e2e6aaf94f9' }),
        update: jest.fn().mockResolvedValue('The call was transferred successfully, say goodbye to the customer.')
      }
    };
  };
});

test('Verify Twilio mock is applied correctly', () => {
  const twilio = require('twilio');
  const client = twilio('dummySid', 'dummyToken');
  expect(typeof client.calls.create).toBe('function');
  expect(typeof client.calls.update).toBe('function');
});

test('Expect transferCall to successfully redirect call', async () => {
  async function makeOutBoundCall() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const client = require('twilio')(accountSid, authToken);

    const sid = await client.calls
      .create({
        url: `https://${process.env.SERVER}/incoming`,
        to: process.env.YOUR_NUMBER,
        from: process.env.FROM_NUMBER
      })
      .then(call => call.sid);

    return sid;
  }

  const callSid = await makeOutBoundCall();
  console.log(callSid);
  await setTimeout(10000);

  const transferResult = await transferCall({ callSid });

  expect(transferResult).toBe('The call was transferred successfully, say goodbye to the customer.');
}, 20000);
