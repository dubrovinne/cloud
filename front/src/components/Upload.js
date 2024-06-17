import React, { useState } from 'react'
import './Upload.css'

function Upload({ refreshFileList }) {
	const [message, setMessage] = useState('')

	const handleFileChange = event => {
		const file = event.target.files[0]
		if (file) {
			const formData = new FormData()
			formData.append('file', file)

			fetch('/api/upload', {
				method: 'POST',
				body: formData,
			})
				.then(response => response.json())
				.then(data => {
					setMessage(data.message)
					refreshFileList()
				})
				.catch(error => {
					console.error('Ошибка при загрузке файла:', error)
					setMessage('Ошибка при загрузке файла')
				})
		}
	}

	return (
		<div className='upload-container'>
			<input type='file' id='fileInput' onChange={handleFileChange} />
			<label htmlFor='fileInput'>Выберите файл</label>
			{message && <p>{message}</p>}
		</div>
	)
}

export default Upload
