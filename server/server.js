const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const { sequelize } = require('./models')
const courseController = require('./controllers/course')


const app = express()
app.set('trust proxy', true)
app.use(cors())
app.use(morgan('combined'))
app.use(express.json({ limit: '50mb' }))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(`/courses`, courseController)



async function startServer () {
    try {
      await sequelize.sync()
      console.log('Database synchronized successfully')
      app.listen(process.env.PORT, () => {
        console.log('Server is running')
      })
    } catch (error) {
      console.error('Error starting server:', error)
    }
  }
  
startServer()
