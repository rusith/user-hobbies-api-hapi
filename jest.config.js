/* eslint-disable no-undef */
module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.+(ts)"],
  transform: {
    "^.+\\.(ts|tsx|js)$": "ts-jest"
  },
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
  globals: {
    "ts-jest": {
      isolatedModules: true
    }
  },
  moduleNameMapper: {
    "app/(.*)": "<rootDir>/src/app/$1"
  },
  // moduleDirectories: ["node_modules", "src", "node_modules/mongoose/node_modules"],
  testEnvironment: "node",
  preset: "ts-jest"
}
