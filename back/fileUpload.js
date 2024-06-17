const express = require('express')
const multer = require('multer')
const path = require('path')

const router = express.Router()

const filesDirectory = path.resolve(__dirname, '../files')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, filesDirectory)
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})
const upload = multer({ storage })

router.post('/upload', upload.single('file'), (req, res) => {
	res.json({ message: 'Файл успешно загружен' })
})

module.exports = router
