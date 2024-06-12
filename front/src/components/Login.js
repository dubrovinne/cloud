import React, { useState } from 'react'
import './Login.css'

function Login({ setToken }) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')

	const login = () => {
		fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		})
			.then(response => response.json())
			.then(data => {
				if (data.token) {
					setToken(data.token)
					setMessage('Вход выполнен успешно')
				} else {
					setMessage(data.message)
				}
			})
			.catch(error => console.error('Ошибка:', error))
	}

	return (
		<div className='login-container'>
			<h2>Авторизация</h2>
			<div className='login-form'>
				<input
					type='text'
					value={username}
					onChange={e => setUsername(e.target.value)}
					placeholder='Логин'
					className='login-input'
				/>
				<input
					type='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder='Пароль'
					className='login-input'
				/>
				<button onClick={login} className='login-button'>
					Войти
				</button>
			</div>
			{message && <p className='login-message'>{message}</p>}
		</div>
	)
}

export default Login
