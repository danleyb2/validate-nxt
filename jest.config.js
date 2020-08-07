module.exports = {
  transform: {
    '^.+\\.vue$': 'vue-jest', // jest-vue-preprocessor ?
    '.+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$':'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },

  snapshotSerializers: ['jest-serializer-vue'],

  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],

  testMatch: [
    '**/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.spec.(js|jsx|ts|tsx))'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.vue',
    '<rootDir>/src/pages/**/*.vue'
  ],
  testURL: 'http://localhost/',

  setupFiles: ['<rootDir>/jest.setup.js']
}
