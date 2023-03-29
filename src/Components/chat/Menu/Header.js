import React from 'react'
import { useContext ,useState} from 'react'
import { AccountContext } from "../../context/AccountProvider";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InfoDrawer from '../../drawer/InfoDrawer';


export default function Header() {
	const { account } = useContext(AccountContext);
	const [open,setOpen] = useState(null);
	const handleClose=()=>{
		setOpen(null);
	}
	const handleClick=(e)=>{
		setOpen(e.currentTarget);
	}
	const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer=()=>{
		setOpenDrawer(true);
	}
	return (
		<div>
			<div className="dpHolder">
				<div className="userinfo">
					<img src={account.picture} alt="dp" className='dp' onClick={()=>{toggleDrawer()}} />
					<h3 className='userName'>{account.given_name}</h3>
				</div>
				<div className="icons">
					<MarkUnreadChatAltIcon className='rightMove iconSize' />
					<MoreVertIcon className='iconSize'  onClick={handleClick}/>
					<Menu
						anchorEl={open}
						getContentAnchorE1={null}
						keepMounted
						open={open}
						onClose={handleClose}
						anchorOrigin={{
							vertical:"bottom",
							horizontal:"center"
						}}
					>
						<MenuItem onClick={()=>{handleClose(); setOpenDrawer(true);}}>Profile</MenuItem>
						<MenuItem onClick={handleClose}>My account</MenuItem>
						<MenuItem onClick={handleClose}>Logout</MenuItem>
						
					</Menu>
				</div>
			</div>
      <InfoDrawer open={openDrawer} setOpen={setOpenDrawer}/>
		</div>
	)
}
