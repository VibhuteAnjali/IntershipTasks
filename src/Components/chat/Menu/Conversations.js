import React from 'react'
import { Divider } from '@mui/material';
import { useEffect, useState, useContext } from 'react'
import { getUsers } from '../../../service/api';
import Conversation from './Conversation';
import { AccountContext } from '../../context/AccountProvider';
export default function Conversations({text}) {
	const [users, setUsers] = useState([]);
	//const [setActiveUsers] = useContext(AccountContext);
	const { account,setActiveUsers } = useContext(AccountContext)
	const { socket } = useContext(AccountContext)
	useEffect(() => {
		const fetchData = async () => {
			let response = await getUsers();
			const filterData=response.filter(user=>user.name.toLowerCase().includes(text.toLowerCase()));
			setUsers(filterData);
		}
		fetchData();
	}, [text]);
	useEffect(() => {
		socket.current.emit('addUsers',account);
		socket.current.on("getUsers",users=>{
			setActiveUsers(users);
		})
	}, [account]);
	return (
		<div className='scrollable'>
			{
				users.map(user => (
					user.sub !== account.sub &&
					<>
						<Conversation user={user} />
						<Divider variant='middle' sx={{ bgcolor: "#544F4F" }}/>
						
					</>
				))
			}
		</div>
	)
}
