const express = require('express')
const multer = require('multer')
const router = express.Router()
const { models } = require('../models')

// const storage = multer.memoryStorage({
//   destination(req, file, callback) {
//       callback(null, '')
//   }
// })

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({
  storage,
  limits: {
      fileSize: 2000000},
  // fileFilter(req, file, callback) {
  //     checkFileType(file, callback)
  // }
})  

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { name, prepare, price } = req.body
        const fileName = req.file.filename
        console.log('fileName', fileName)
        const course = await models.Course.create({ name, prepare, price, file:fileName })
        res.status(200).json(course)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/download/:filename', async (req, res) => {
  try {
      const course = await models.Course.findOne({ where: { file: req.params.filename } })
      res.download(course.path)
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const courses = await models.Course.findAll()
    res.status(200).json(courses)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
module.exports = router
