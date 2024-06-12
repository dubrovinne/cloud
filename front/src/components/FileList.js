import React, { useEffect, useState } from 'react'
import './FileList.css'

function FileList({ refreshKey }) {
	const [files, setFiles] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const filesPerPage = 8

	useEffect(() => {
		fetchFiles()
	}, [refreshKey])

	const fetchFiles = () => {
		fetch('/api/files')
			.then(response => {
				if (!response.ok) {
					throw new Error('Ошибка при получении файлов')
				}
				return response.json()
			})
			.then(data => {
				setFiles(data)
			})
			.catch(error => console.error('Ошибка при получении файлов:', error))
	}

	const indexOfLastFile = currentPage * filesPerPage
	const indexOfFirstFile = indexOfLastFile - filesPerPage
	const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile)

	const paginate = pageNumber => setCurrentPage(pageNumber)

	return (
		<div className='file-list-container'>
			<h2>Список файлов</h2>
			<div className='file-list'>
				{currentFiles.map((file, index) => (
					<div key={index} className='file-item'>
						<div className='file-name'>
							<a href={`http://localhost:5000${file.url}`} download={file.name}>
								{file.name}
							</a>
						</div>
						<div className='file-details'>
							<span>Размер: {file.size} Б</span>
							<span>Тип: {file.type}</span>
							<span>Изменен: {new Date(file.modified).toLocaleString()}</span>
						</div>
					</div>
				))}
			</div>
			<div className='pagination'>
				{Array.from(
					{ length: Math.ceil(files.length / filesPerPage) },
					(_, index) => (
						<button key={index + 1} onClick={() => paginate(index + 1)}>
							{index + 1}
						</button>
					)
				)}
			</div>
		</div>
	)
}

export default FileList
