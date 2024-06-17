const express = require('express')

const router = express.Router()

let users = [
	{ username: 'zxc', password: 'zxc1' },
	{ username: 'user2', password: 'password2' },
]

router.post('/login', (req, res) => {
	const { username, password } = req.body
	const user = users.find(
		user => user.username === username && user.password === password
	)
	if (!user) {
		return res.status(401).json({ message: 'Неверные учетные данные' })
	}
	res.json({ token: 'dummy-token' })
})

module.exports = router
