import './App.css';
//680678193293-dd8cnpvcne4vvou5sldkh9gccj6j8jvj.apps.googleusercontent.com
import Messenger from './Components/Messenger';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './Components/context/AccountProvider';


function App() {
	const id = `680678193293-dd8cnpvcne4vvou5sldkh9gccj6j8jvj.apps.googleusercontent.com`;
	return (
		<div className="App">
			<GoogleOAuthProvider clientId={id}>
				<AccountProvider>
					<Messenger/>
				</AccountProvider>

			</GoogleOAuthProvider>;
		</div>
	);
}

export default App;
