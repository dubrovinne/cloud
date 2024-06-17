import React, { useEffect, useState } from 'react'
import './FileList.css'
import { Pagination } from '@mui/material'

function FileList({ refreshKey, sortCriteria }) {
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

	const getSortedFiles = (files, criteria) => {
		let sortedFiles = [...files]
		if (criteria === 'date') {
			sortedFiles.sort((a, b) => new Date(b.modified) - new Date(a.modified))
		} else if (criteria === 'name-asc') {
			sortedFiles.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
		} else if (criteria === 'name-desc') {
			sortedFiles.sort((a, b) => b.name.localeCompare(a.name, 'ru'))
		}
		return sortedFiles
	}

	const getFileNameWithoutExtension = fileName => {
		const dotIndex = fileName.lastIndexOf('.')
		return dotIndex === -1 ? fileName : fileName.substring(0, dotIndex)
	}

	const getFileExtension = fileName => {
		const dotIndex = fileName.lastIndexOf('.')
		return dotIndex === -1 ? '' : fileName.substring(dotIndex + 1)
	}

	const sortedFiles = getSortedFiles(files, sortCriteria)

	const indexOfLastFile = currentPage * filesPerPage
	const indexOfFirstFile = indexOfLastFile - filesPerPage
	const currentFiles = sortedFiles.slice(indexOfFirstFile, indexOfLastFile)

	const handlePageChange = (event, value) => {
		setCurrentPage(value)
	}

	return (
		<div className='file-list-container'>
			<div className='file-list'>
				{currentFiles.map((file, index) => (
					<div key={index} className='file-item'>
						<div className='file-name'>
							<a href={`http://localhost:5000${file.url}`} download={file.name}>
								{getFileNameWithoutExtension(file.name)}
							</a>
						</div>
						<div className='file-details'>
							<span>
								Размер: <span className='file-data'>{file.size} Б</span>
							</span>
							<span>
								Тип:{' '}
								<span className='file-data'>{getFileExtension(file.name)}</span>
							</span>
							<span>
								Изменен:{' '}
								<span className='file-data'>
									{new Date(file.modified).toLocaleString()}
								</span>
							</span>
						</div>
					</div>
				))}
			</div>
			<div className='pagination'>
				<Pagination
					count={Math.ceil(sortedFiles.length / filesPerPage)}
					page={currentPage}
					onChange={handlePageChange}
					variant='outlined'
					shape='rounded'
				/>
			</div>
		</div>
	)
}

export default FileList
