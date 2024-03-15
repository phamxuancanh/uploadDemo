const sequelize = require('./init')
const Course = require('./course')
module.exports = {
  sequelize,
  models: {
    Course
  }
}
