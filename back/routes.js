const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()

const filesDirectory = path.resolve(__dirname, '../files')

router.get('/files', (req, res) => {
	fs.readdir(filesDirectory, (err, files) => {
		if (err) {
			console.error('Ошибка при чтении директории:', err)
			return res.status(500).json({ message: 'Ошибка при чтении файлов' })
		}

		const fileDetails = files.map(file => {
			const filePath = path.join(filesDirectory, file)
			const stats = fs.statSync(filePath)
			return {
				name: file,
				size: stats.size,
				type: path.extname(file),
				modified: stats.mtime,
				url: `/files/${encodeURIComponent(file)}`,
			}
		})

		res.setHeader('Content-Type', 'application/json; charset=utf-8')
		res.json(fileDetails)
	})
})

module.exports = router
