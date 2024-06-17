import React, { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import FileList from './components/FileList'
import Upload from './components/Upload'
import Sort from './components/Sort' // Добавляем импорт компонента Sort

function App() {
	const [token, setToken] = useState(localStorage.getItem('token') || '')
	const [refreshKey, setRefreshKey] = useState(0)
	const [sortCriteria, setSortCriteria] = useState('date') // Определяем состояние для сортировки

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
					<div className='container'>
						<div className='upload-sort-container'>
							<Upload refreshFileList={refreshFileList} />
							<Sort sortFiles={setSortCriteria} />
						</div>
						<FileList
							refreshKey={refreshKey}
							refreshFileList={refreshFileList}
							sortCriteria={sortCriteria} // Передаем критерий сортировки в FileList
						/>
					</div>
				</div>
			)}
		</div>
	)
}

export default App
