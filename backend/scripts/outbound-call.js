/*
  You can use this script to place an outbound call
  to your own mobile phone.
*/

require('dotenv').config();

async function makeOutBoundCall() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  
  const client = require('twilio')(accountSid, authToken);

  
  const server = process.env.SERVER;
  const yourNumber = process.env.YOUR_NUMBER;
  const fromNumber = process.env.FROM_NUMBER;

  console.log('TWILIO_ACCOUNT_SID:', accountSid);
  console.log('TWILIO_AUTH_TOKEN:', authToken);
  console.log('SERVER:', server);
  console.log('YOUR_NUMBER:', yourNumber);
  console.log('FROM_NUMBER:', fromNumber);

  await client.calls
    .create({
      url: `https://${process.env.SERVER}/incoming`,
      to: process.env.YOUR_NUMBER,
      from: process.env.FROM_NUMBER
    })
    .then(call => console.log(call.sid));
}

makeOutBoundCall();