const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const fileRoutes = require('./routes')
const authRoutes = require('./auth')
const uploadRoutes = require('./fileUpload')

const app = express()
const port = 5000

const filesDirectory = path.resolve(__dirname, '../files')
console.log(`Директория с файлами: ${filesDirectory}`)

if (!fs.existsSync(filesDirectory)) {
	fs.mkdirSync(filesDirectory)
}

app.use(bodyParser.json())

// Подключаем маршруты
app.use('/api', fileRoutes)
app.use('/api', authRoutes)
app.use('/api', uploadRoutes)

app.use('/files', express.static(filesDirectory))

app.listen(port, () => {
	console.log(`Сервер запущен на http://localhost:${port}`)
})
