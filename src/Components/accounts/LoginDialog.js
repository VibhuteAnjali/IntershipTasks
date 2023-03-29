import React, { useContext } from "react";
import { Dialog, Typography, Box, List, ListItem, styled } from "@mui/material";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import img from "../../image/Group1.png"
import { AccountContext } from "../context/AccountProvider";
//import Context from "@mui/base/TabsUnstyled/TabsContext";
import { addUser } from "../../service/api";
const dialogstyle = {
	height: "60vh",
	width: "60vw",
	maxHeight: "100%",
	boxShadow: "none",
	display: "grid",
	backgroundColor: "#252726",
	color: "white"
}
const Component = styled(Box)`
		padding:1em;
		display:flex;
		flex-direction:column;
		align-items:center;
		justify-content: center;
		justify-self:center;
		`
const Container = styled(Box)`
		display:grid;
		font-family:"roboto";
		`
const Header = styled(Typography)`
		font-size:150%
		`
const Item = styled(ListItem)`
		font-size:130%
		`
const Ul = styled(List)`
     margin-bottom: 2em;
`


export default function LoginDialog() {
	const { setAccount } = useContext(AccountContext);
	const onLoginSuccess = async (res) => {
		const decoded = jwt_decode(res.credential);
		console.log(decoded);
		setAccount(decoded);
		await addUser(decoded);
	}
	const LoginFailure = (res) => {
		console.log("Login Failed: ", res);
	}
	return (
		<Container>
			<Dialog
				open={true}
				PaperProps={{ sx: dialogstyle }}
				hideBackdrop={true}>
				<Component >
					<img src={img} alt="logo" className="logo"/>
					<Header> Open Lets Chat On Your Laptop</Header>
					<Box>
						<Ul>
							<Item>1. Open Lets Chat</Item>
							<Item>2. Login Through Google</Item>
						</Ul>
					</Box>
					<Box>

						<GoogleLogin
							onSuccess={onLoginSuccess}
							onError={LoginFailure}
							useOneTap
						/>
					</Box>
				</Component>
			</Dialog>
		</Container>
	);
}
