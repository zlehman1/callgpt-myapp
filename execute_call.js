require('dotenv').config();
const twilio = require('twilio');

async function executeCall() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  try {
    const call = await client.calls.create({
      url: `http://${process.env.SERVER}/incoming`,
      to: process.env.YOUR_NUMBER,
      from: process.env.FROM_NUMBER
    });

    console.log('Call initiated successfully:', call.sid);

    // Wait for 10 seconds to ensure the call is in-progress
    await new Promise(resolve => setTimeout(resolve, 10000));

    const transferResult = await client.calls(call.sid)
      .update({ twiml: `<Response><Dial>${process.env.TRANSFER_NUMBER}</Dial></Response>` });

    console.log(transferResult);
  } catch (error) {
    console.error('Error initiating or transferring call:', error);
  }
}

executeCall();
