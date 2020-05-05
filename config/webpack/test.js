process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

// prevent Jest from yelling at me for having a file named test.js that
// doesn't have any tests
test("Passes", () => {
  expect(1).toBe(1)
})

module.exports = environment.toWebpackConfig()
