import React, { useContext } from "react";
import { AppBar, Box, Toolbar, styled } from "@mui/material";
import LoginDialog from "./accounts/LoginDialog";
import ChatDialog from "./chat/ChatDialog";
import { AccountContext } from "./context/AccountProvider";
const LoginHeader = styled(AppBar)`
    height:100vh;
		background-color:#252726`

const Header = styled(AppBar)`
		height:100vh;
		background-color:#202c33`
const Component = styled(Box)`
      height:100vh;
      background-color:#252726`

	
export default function Messenger() {
	const { account } = useContext(AccountContext);
	return (
		<div>
			{account ?
				<>
					<Component sx={{ flexGrow: 1 }}>
						<Header position="static">
							<Toolbar></Toolbar>
						</Header>
					</Component>
					<ChatDialog /></> :
				<>
					<Box sx={{ flexGrow: 1 }}>
						<LoginHeader position="static" background-color="#252726">
							<Toolbar></Toolbar>
						</LoginHeader>
					</Box>
					<LoginDialog />
				</>
			}
		</div>
	);
}
