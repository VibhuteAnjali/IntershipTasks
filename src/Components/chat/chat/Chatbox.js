import React from 'react'
import { useContext, useState, useEffect, useRef } from 'react'
import { AccountContext } from '../../context/AccountProvider'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Search from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import { getConversation, getMessages, newMessage, uploadFile } from '../../../service/api.js';
import Message from './Message';
import { socket } from 'socket.io-client';

export default function Chatbox() {
	const { person } = useContext(AccountContext);
	const { account, socket, newMessageFlag, setNewMessageFlag } = useContext(AccountContext);
	const [open, setOpen] = useState(null);
	const [text, setText] = useState('');
	const [conversation, setConversation] = useState({});
	const [messages, setMessages] = useState([]);
	const [file, setFile] = useState([]);
	//const {newMessageFlag, setNewMessageFlag} = useState(false);
	const [image, setImage] = useState('');
	const scrollRef = useRef();
	const { activeUsers } = useContext(AccountContext)
	const [incomingMessage, setIncomingMessage] = useState(null);
	const handleClick = (e) => {
		setOpen(e.currentTarget);
	}
	useEffect(() => {
		const getConversationDetails = async () => {
			let data = await getConversation({ senderId: account.sub, receiverId: person.sub });
			setConversation(data);
			console.log(data);
		}
		getConversationDetails();
	}, [person.sub])
	useEffect(() => {
		socket.current.on('getMessage', data => {
			setIncomingMessage({
				...data,
				createdAt: Date.now()
			})
		})
	}, [])
	useEffect(() => {
		incomingMessage && conversation?.members?.includes(incomingMessage.senderId) && setMessages(prev => [...prev, incomingMessage])
	}, [incomingMessage, conversation])
	const sendMessage = async (e) => {
		const code = e.keycode || e.which;
		//console.log(e);
		if (code === 13) {
			let message = {}
			if (!file) {
				message = {
					senderId: account.sub,
					receiverId: person.sub,
					conversationId: conversation._id,
					type: 'text',
					text: text
				}
			}
			else {
				message = {
					senderId: account.sub,
					receiverId: person.sub,
					conversationId: conversation._id,
					type: 'file',
					text: image
				}
			}
			e.preventDefault();
			console.log(message);
			socket.current.emit('sendMessage', message);
			await newMessage(message)
			setText('');
			setFile('');
			setImage('');
			setNewMessageFlag(prev => !prev)
		}
	}
	useEffect(() => {
		const getMessageDetails = async () => {
			let data = await getMessages(conversation._id);
			console.log(data);
			setMessages(data);
		}
		conversation._id && getMessageDetails();
	}, [person._id, conversation._id, newMessageFlag]);

	const onfileChange = (e) => {
		setFile(e.target.files[0]);
		setText(e.target.files[0].name)
	}
	useEffect(() => {
		const getImage = async () => {
			if (file) {
				const data = new FormData();
				data.append("name", file.name);
				data.append("file", file);

				let response = await uploadFile(data);
				setImage(response.data);
			}
		}
		getImage();
	}, [file]);
	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages]);

	return (
		<div>
			<div className="chatheader">
				<div className="header">
					<img src={person.picture} alt="dp" className='header-image' />
					<div className="flex">
						<h3 className='gName' >{person.given_name}</h3>
						<p className='status'>{activeUsers?.find(user => user.sub === person.sub) ? 'Online' : 'offline'}</p>
					</div>
				</div>
				<div className="icons">

					<Search className='rightMove iconSize' />
					<MoreVertIcon className='iconSize' onClick={handleClick} />
				</div>

			</div>
			<div className="chatArea scroll" ref={scrollRef}>
				<div>
					{
						messages && messages.map(message => {
							return <Message message={message} text={text} />
						})
					}
				</div>
			</div>
			<div className="messagehandler">

				<div className="messageBox">
					<div className="addicons">
						<EmojiEmotionsOutlinedIcon />
						<label htmlFor="attach">
							<AttachFileOutlinedIcon />
						</label>
						<input type="file" name="attach" id="attach" style={{ display: 'none' }}
							onChange={(e) => { onfileChange(e) }} />
					</div>
					<div className="sendMessage">
						<form action="/" className='sendform'>
							<input type="search" name="search" id="chatsearch" placeholder='Type a message'
								onChange={(e) => { setText(e.target.value) }}
								onKeyDown={(e) => sendMessage(e)}
								value={text} />
							<SendIcon className='send' />
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
