import React from 'react'
import Menu from "./Menu/Menu"
import Chat from "./chat/MainBox"
import { useContext } from 'react'
import { Dialog } from "@mui/material";
import { AccountContext } from '../context/AccountProvider';
import Chatbox from './chat/Chatbox';
const dialogstyle = {
	maxWidth: "95vw",
	height: "96vh",
	width: "100vw",
	maxHeight: "100%",
	display: "grid",
	boxShadow: "5px 10px 20px 0px #00000078"
}
export default function ChatDialog() {
	const { person } = useContext(AccountContext)
	return (
		<div>
			<Dialog
				open={true}
				PaperProps={{ sx: dialogstyle }}
				hideBackdrop={true}>
				<div className="parent">
					<div className="left">
						<Menu />
					</div>
					<div className="right">
						{
							Object.keys(person).length ? <Chatbox /> : <Chat />
						}
					</div>
				</div>
			</Dialog>
		</div>
	)
}
