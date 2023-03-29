import axios from 'axios';
const url = 'http://localhost:8000';
export const addUser=async (data)=>{
	try {
		await axios.post(`${url}/add`, data); 
	} catch (error) {
		console.log('error while adding user', error.message);
	}
}
export const getUsers = async()=>{
	try {
		const response =await axios.get(`${url}/users`); 
		console.log(response);
		return response.data;
	} catch (error) {
		console.log("error wile calling users",error.message);
	}
}

export const setConversation = async (data)=>{
	try {
		await axios.post(`${url}/conversation/add`, data)
	} catch (error) {
		console.log("error while making conversations",error.message);
	}
}

export const getConversation = async (data)=>{
	try{
		let response =await axios.post(`${url}/conversation/get`,data)
		return response.data;
	}catch(error){
		console.log("error while getting conversations",error.message);
	}
}

export const newMessage=async(data)=>{
	try {
		await axios.post(`${url}/message/add`,data);
		
	} catch (error) {
		console.log("error making new message conversations",error.message);
	}
}
export const getMessages=async(id)=>{
	try {
		let response =await axios.get(`${url}/message/get/${id}`);
		return response.data
		
	} catch (error) {
		console.log("error while getting message ",error.message);
	}
}
export const uploadFile=async(data)=>{
	try {
		return await axios.post(`${url}/file/upload`,data)
		
	} catch (error) {
		console.log("error while uploading file ",error.message);
	}
}