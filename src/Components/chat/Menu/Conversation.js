import React from 'react'
import { useContext ,useEffect,useState} from 'react';
import { AccountContext } from '../../context/AccountProvider'
import { formatDate } from '../../../utils/common-utils';
import { setConversation,getConversation } from '../../../service/api';
export default function Conversation({ user }) {
	const { setPerson, account ,newMessageFlag} = useContext(AccountContext);
	const [message,setMessage]=useState({});
	const getSpecificUser = async () => {
		setPerson(user);
		await setConversation({ senderId: account.sub, receiverId: user.sub })
	}
	useEffect(()=>{
		const getConversationDetails=async()=>{
			const data=await getConversationDetails({senderId:account.sub, receiverId:user.sub});
			setMessage({text:data?.message, timestamp:data?.updatedAt})
		}
		getConversationDetails();
	},[newMessageFlag])
	return (
		<div className='container' >
			<div className="main" onClick={() => getSpecificUser()}>
				<div className="pic">
					<img src={user.picture} alt="dp" className="pic" />
				</div>
				<div >
					<h3 className="info">{user.name}</h3>
					{
						message?.text &&
						<p>{formatDate(message?.timestamp)}</p>
						 
					}
				</div>
				<div>
					<p>{message?.text?.includes('localhost')? 'media': message.text}</p>
				</div>
			</div>
		</div>
	)
}
