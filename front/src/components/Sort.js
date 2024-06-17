import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import './Sort.css'

function Sort({ sortFiles }) {
	const handleSortChange = event => {
		sortFiles(event.target.value)
	}

	return (
		<div className='sort-container'>
			<FormControl variant='outlined' className='sort-form-control'>
				<InputLabel id='sort-label'>Сортировка</InputLabel>
				<Select
					labelId='sort-label'
					id='sort-select'
					defaultValue='date'
					onChange={handleSortChange}
					label='Сортировка'
				>
					<MenuItem value='date'>По дате загрузки</MenuItem>
					<MenuItem value='name-asc'>По имени (A-Z/А-Я)</MenuItem>
					<MenuItem value='name-desc'>По имени (Z-A/Я-А)</MenuItem>
				</Select>
			</FormControl>
		</div>
	)
}

export default Sort
