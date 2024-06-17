import React from 'react'
import './Sort.css'

function Sort({ sortFiles }) {
	const handleSortChange = event => {
		sortFiles(event.target.value)
	}

	return (
		<div className='sort-container'>
			<select onChange={handleSortChange}>
				<option value=''>Выберите сортировку</option>
				<option value='date'>По дате загрузки</option>
				<option value='name-asc'>По имени (A-Z/А-Я)</option>
				<option value='name-desc'>По имени (Z-A/Я-А)</option>
			</select>
		</div>
	)
}

export default Sort
