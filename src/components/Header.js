// Note: will Fix import later
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './../assets/images/logo.svg';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutRedux } from '../redux/actions/userAction';

const Header = (props) => {
	// chuyen huong trang - react-router v6
	const navigate = useNavigate();

	// send action to reducer
	const dispatch = useDispatch();

	// get state from redux
	const user = useSelector((state) => state.user.account);

	const handleLogout = () => {
		dispatch(handleLogoutRedux());
	};

	// when render done then useEffect will be called :
	// check user if logged out or logged in (was code handleRefresh)
	useEffect(() => {
		// if user.auth = null then will not run.
		if (user && user.auth === false) {
			navigate('/');
			toast.success('Log out success!');
		}
	}, [user]);

	return (
		<>
			<Navbar expand='lg' className='bg-body-tertiary'>
				<Container>
					<Navbar.Brand href='/'>
						<img
							alt='React boostrap App'
							src={logo}
							width={30}
							height={30}
							className='d-inline-block align-top'
						/>{' '}
						React-App
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						{/* show/hide header when login or not */}
						{((user && user.auth) || window.location.pathname === '/') && (
							<>
								<Nav className='me-auto'>
									<NavLink to='/' className='nav-link'>
										Home
									</NavLink>
									<NavLink to='/users' className='nav-link'>
										Manage Users
									</NavLink>
								</Nav>
								<Nav>
									{/* check if was login => show name user to tile on nav */}
									{user && user.email && (
										<span className='nav-link'>Welcome {user.email}</span>
									)}
									<NavDropdown title='Setting'>
										{/* check if was login => only show logout button   */}
										{user && user.auth === true ? (
											<NavDropdown.Item onClick={() => handleLogout()}>
												Logout
											</NavDropdown.Item>
										) : (
											<NavLink to='/login' className='dropdown-item'>
												Login
											</NavLink>
										)}
									</NavDropdown>
								</Nav>
							</>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default Header;
