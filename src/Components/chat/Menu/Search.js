import React from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
export default function({setText}) {
	return (
		<div>
     <form>
			<SearchRoundedIcon className='SearchIcon'/>
			<input type="text" name="search" id="search" placeholder='Search from Contacts' onChange={(e)=>setText(e.target.value)}/>
		 </form>
		</div>
	)
}
