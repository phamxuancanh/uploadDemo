const express = require('express')
const multer = require('multer')
const router = express.Router()
const { models } = require('../models')
const path = require('path')
const iconv = require('iconv-lite')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const fileName = iconv.encode(file.originalname, 'ISO-8859-1').toString();
    return cb(null, `${Date.now()}_${fileName}`)
  }
})

const upload = multer({
  storage,
  limits: {
      fileSize: 2000000},
})  

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
      const { name, prepare, price } = req.body
      let fileName = req.file.filename
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
router.get('/files/:filename', function(req, res){
  console.log('req.params.filename', req.params.filename)
  const file = path.resolve(__dirname, '../uploads', req.params.filename);
  res.download(file); // Set disposition and send it.
});
module.exports = router
