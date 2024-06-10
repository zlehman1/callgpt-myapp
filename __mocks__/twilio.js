/* global jest */

module.exports = function() {
  return {
    calls: {
      create: jest.fn().mockResolvedValue({ sid: 'CA34995af316a19c4052e00e2e6aaf94f9' }),
      update: jest.fn().mockResolvedValue('The call was transferred successfully, say goodbye to the customer.')
    }
  };
};
