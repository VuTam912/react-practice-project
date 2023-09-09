import { Routes, Route } from 'react-router-dom';
import Home from './../components/Home';
import Login from './../components/Login';
import PrivateRoutes from './PrivateRoutes';
import TableUsers from '../components/TableUsers';
import { UserContext } from './../context/UserContext';
import { useContext } from 'react';

/* React-router ver 6. */

const AppRoutes = () => {
	const { user } = useContext(UserContext);

	return (
		<>
			{/* Routes - Switch */}
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route
					path='/users'
					element={
						<PrivateRoutes>
							{/* children */}
							<TableUsers />
						</PrivateRoutes>
					}
				/>
			</Routes>
		</>
	);
};

export default AppRoutes;
