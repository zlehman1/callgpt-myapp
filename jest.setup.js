/* global jest */

// jest.setup.js

// This file is executed before each test file is run.
// It can be used to set up any global configurations or mocks needed for the tests.

console.log('jest.setup.js is being executed');

// Example: Setting up a global mock for the Twilio client
jest.mock('twilio', () => {
  return {
    calls: {
      create: jest.fn().mockResolvedValue({ sid: 'CA34995af316a19c4052e00e2e6aaf94f9' }),
      update: jest.fn().mockResolvedValue('The call was transferred successfully, say goodbye to the customer.')
    }
  };
});
