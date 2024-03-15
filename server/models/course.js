const { DataTypes } = require('sequelize')
const sequelize = require('./init')

const Course = sequelize.define(
  'Course',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: 'Course1'
    },
    prepare: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(15, 2)
    },
    file: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    tableName: 'courses'
  }
)

module.exports = Course
