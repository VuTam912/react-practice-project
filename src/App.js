import { Container, Row } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/UserContext';

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
				<Container>
					<Header />
					{/* React-router ver 6. */}
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/users' element={<TableUsers />} />
						<Route path='/login' element={<Login />} />
					</Routes>
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
