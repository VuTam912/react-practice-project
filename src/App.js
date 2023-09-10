import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { handleRefresh } from './redux/actions/userAction';

function App() {
	// console.log('>>> State User: ', user);

	const dispatch = useDispatch();

	// check user was login or not
	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(handleRefresh());
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
