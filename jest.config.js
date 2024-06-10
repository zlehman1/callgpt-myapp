module.exports = {
  testEnvironment: 'node',
  globals: {
    'jest': true
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '^twilio$': '<rootDir>/__mocks__/twilio.js'
  }
};
