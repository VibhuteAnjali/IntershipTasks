import React from 'react'
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import { useContext } from 'react'
import { AccountContext } from '../../context/AccountProvider';
import { formatDate,downloadMedia } from '../../../utils/common-utils'
const iconPDF = 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/27_Pdf_File_Type_Adobe_logo_logos-512.png';
export default function Message({ message}) {
	const { account } = useContext(AccountContext);
	return (
		<>
			{
				account.sub === message.senderId ?

					<div className='sent'>
						{
							message.type === 'file' ?
								<ImageMessage message={message} /> : <TextMessage message={message} />
						}
					</div>
					:
					<div className='received'>
						{
							message.type === 'file' ?
								<ImageMessage message={message} /> :
								<TextMessage message={message} />

						}
					</div>

			}
		</>
	)
}
const ImageMessage = ({ message }) => {
	return (
		<div>
			{
				message?.text?.includes('.pdf') ?
					<div style={{display:"flex"}}>
            <img src={iconPDF} alt="PDF" style={{width:'40%'}}/>
						<p>{message.text.slice(46,66)}</p>
					</div>
					:
					<>
						<img src={message.text} alt={message.text} className="sentImage" />
					</>
			}
			<div className='leftalign'>

				<GetAppOutlinedIcon className='DownloadIcon' 
				onClick={(e)=>{downloadMedia(e,message.text)}}/>
				<p className='msgDateimg'>{formatDate(message.createdAt)}</p>
			</div>
		</div>
	)
}
const TextMessage = ({ message }) => {
	return (
		<>
			<p className='msgText'>{message.text}</p>
			<p className='msgDate'>{formatDate(message.createdAt)}</p>

		</>
	)
}
//const TextMsg = ({ message }) => {
//	return (
//		<>
//			<div className='received'>
//				<p className='msgText'>{message.text}</p>
//				<p className='msgDate'>{formatDate(message.createdAt)}</p>
//			</div>
//		</>
//	)
//}