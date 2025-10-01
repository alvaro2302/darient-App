/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native'
    + '|@react-native'
    + '|@react-native-community'
    + '|@expo'
    + '|expo(nent)?'
    + '|expo-.*'
    + '|@unimodules'
    + '|unimodules-.*'
    + '|react-navigation'
    + '|sentry-expo'
    + ')',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
};