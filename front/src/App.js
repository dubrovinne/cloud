import React, { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import FileList from './components/FileList'
import Upload from './components/Upload'

function App() {
	const [token, setToken] = useState(localStorage.getItem('token') || '')
	const [refreshKey, setRefreshKey] = useState(0)

	useEffect(() => {
		if (token) {
			localStorage.setItem('token', token)
		} else {
			localStorage.removeItem('token')
		}
	}, [token])

	const refreshFileList = () => {
		setRefreshKey(prevKey => prevKey + 1)
	}

	return (
		<div className='App'>
			{!token ? (
				<div className='Login-container'>
					<Login setToken={setToken} />
				</div>
			) : (
				<div className='Content'>
					<Upload refreshFileList={refreshFileList} />
					<FileList refreshKey={refreshKey} />
				</div>
			)}
		</div>
	)
}

export default App
