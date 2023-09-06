import { Container, Row } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';

import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<>
			<div className='app-container'>
				<Header />
				<Container>
					<TableUsers />
				</Container>
			</div>
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
