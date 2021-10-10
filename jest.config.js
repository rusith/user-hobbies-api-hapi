/* eslint-disable no-undef */
module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.+(ts)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      isolatedModules: true
    }
  },
  moduleDirectories: ["node_modules", "src"],
  preset: "@shelf/jest-mongodb"
}
