// backend/controllers/callController.js

require('dotenv').config();
const twilio = require('twilio');

async function makeOutBoundCall(req, res) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  
  const client = twilio(accountSid, authToken);

  const server = process.env.SERVER;
  const yourNumber = process.env.YOUR_NUMBER;
  const fromNumber = process.env.FROM_NUMBER;

  console.log('TWILIO_ACCOUNT_SID:', accountSid);
  console.log('TWILIO_AUTH_TOKEN:', authToken);
  console.log('SERVER:', server);
  console.log('YOUR_NUMBER:', yourNumber);
  console.log('FROM_NUMBER:', fromNumber);

  try {
    const call = await client.calls.create({
      url: `https://${server}/incoming`,
      to: yourNumber,
      from: fromNumber
    });
    console.log('Call.sid', call.sid);
    res.status(200).json({ success: true }); // Ensure the response is JSON
  } catch (error) {
    console.error('Error initiating call:', error);
    res.status(500).json({ success: false, error: error.message }); // Ensure the response is JSON
  }
}

async function endCall(req, res) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  const client = twilio(accountSid, authToken);
  const callSid = req.body.callSid;

  try {
    const call = await client.calls(callSid).update({ status: 'completed' });
    res.status(200).send({ success: true, message: 'Call ended successfully' });
  } catch (error) {
    console.error('Error ending call:', error);
    res.status(500).send({ success: false, message: 'Failed to end call' });
  }
}

module.exports = { makeOutBoundCall, endCall };

