import React from 'react'
import Conversations from './Conversations'
import Header from './Header'
import Search from './Search'
import { useState } from 'react'
export default function Menu() {
  const [text, setText] = useState('');
	return (
		<div>
			<Header/>
			<Search setText={setText}/>
			<Conversations text={text}/>
		</div>
	)
}
