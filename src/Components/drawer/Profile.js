import React from 'react'
import { useContext } from 'react'
import { AccountContext } from '../context/AccountProvider'
export default function Profile() {
	const {account} = useContext(AccountContext);
	return (
		<div>
			<div className='Profile-dp-holder'>
				<img src={account.picture} alt="dp" className='Profiledp' />
			</div>
			<div className='Profile-name-holder'>
				<p className='Profile-header'>Your Name</p>
				<h2 className='profile-name'> {account.name}</h2>
			</div>
			<div>
				<p className='description'>This name will be visible to your contacts and is provided by Google</p>
			</div>
			<div className='Profile-name-holder'>
				<p className='Profile-header'>About</p>
				<p className='profile-name'>Swing</p>
			</div>
		</div>
	)
}
