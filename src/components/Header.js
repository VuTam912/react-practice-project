// Note: will Fix import later
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './../assets/images/logo.svg';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './../context/UserContext';

const Header = (props) => {
	// init
	const { logout, user } = useContext(UserContext);

	const [hideHeader, setHideHeader] = useState(false);

	// // when render component done, then useEffect will be execute
	// useEffect(() => {
	// 	if (window.location.pathname === '/login') {
	// 		setHideHeader(true);
	// 	}
	// }, []);

	// chuyen huong trang - react-router v6
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/');
		toast.success('Logout successfully');
	};

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
