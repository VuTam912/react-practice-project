import { Container, Row } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/UserContext';
import AppRoutes from './routes/AppRoutes';

function App() {
	const { user, loginContext } = useContext(UserContext);

	console.log('>>> State User: ', user);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			loginContext(
				localStorage.getItem('email'),
				localStorage.getItem('token')
			);
		}
	}, []);

	return (
		<>
			<div className='app-container'>
				<Header />
				<Container>
					{/* React-router ver 6. */}
					<AppRoutes />
				</Container>
			</div>

			{/* - Toast - */}
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			{/* Same as */}
			<ToastContainer />
		</>
	);
}

export default App;
