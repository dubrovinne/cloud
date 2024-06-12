const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const app = express()
const port = 5000

const filesDirectory = path.resolve(__dirname, '../files')
console.log(`Директория с файлами: ${filesDirectory}`)

if (!fs.existsSync(filesDirectory)) {
	fs.mkdirSync(filesDirectory)
}

let users = [
	{ username: 'zxc', password: 'zxc1' },
	{ username: 'user2', password: 'password2' },
]

app.use(bodyParser.json())

app.post('/api/login', (req, res) => {
	const { username, password } = req.body
	const user = users.find(
		user => user.username === username && user.password === password
	)
	if (!user) {
		return res.status(401).json({ message: 'Неверные учетные данные' })
	}
	res.json({ token: 'dummy-token' })
})

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, filesDirectory)
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})
const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), (req, res) => {
	res.json({ message: 'Файл успешно загружен' })
})

app.get('/api/files', (req, res) => {
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

app.use('/files', express.static(filesDirectory))

app.listen(port, () => {
	console.log(`Сервер запущен на http://localhost:${port}`)
})
