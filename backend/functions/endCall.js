require('dotenv').config();

const endCall = async function (args) {
  const { callSid } = args;
  console.log('Ending call', callSid);
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);

  return await client.calls(callSid)
    .update({ status: 'completed' })
    .then(() => {
      return { status: 'The call was ended successfully.' };
    })
    .catch((error) => {
      console.error('Error ending the call:', error);
      return { status: 'The call could not be ended successfully. Please try again later.' };
    });
};

module.exports = endCall;
