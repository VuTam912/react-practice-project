import { useEffect, useState, useContext } from 'react';
import { loginApi } from '../services/UserService';
import { toast } from 'react-toastify';
// react-router v6
import { useNavigate } from 'react-router-dom';
import { UserContext } from './../context/UserContext';

const Login = () => {
	// chuyen sang trang khi login thanh
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// hide/show Passwrod when onClick on icon
	const [isShowPassword, setIsShowPassword] = useState(false);
	// loading icon button
	const [loadingAPI, setLoadingApi] = useState(false);

	const { loginContext } = useContext(UserContext);

	useEffect(() => {
		// neu da login roi thi auto chuyen trang home ma ko can phai login lan nuwa
		let token = localStorage.getItem('token');
		if (token) {
			navigate('/');
		}
	}, []);

	// handle login
	const handleLogin = async () => {
		if (!email || !password) {
			toast.error('Email and Password are required');
			return;
		}
		// active Loading icon
		setLoadingApi(true);

		// API fake - pass: 'eve.holt@reqres.in'
		let res = await loginApi(email, password);

		if (res && res.token) {
			// move to Home page when login successful
			loginContext(email, res.token);
			navigate('/');
		} else {
			//error
			if (res && res.status === 400) {
				toast.error(res.data.error);
			}
		}

		// when login was done
		setLoadingApi(false);
	};

	const handleBack = () => {
		navigate('/');
	};

	// thay vi click on Login thi nen nhan enter o input pass la login
	const HandlePressEnter = (e) => {
		if (e && e.key === 'Enter') {
			handleLogin();
		}
	};

	return (
		<>
			{/* Search Google: Breakpoint boostrap: col-sm : =>576px */}
			<div className='login-container col-12 col-sm-4'>
				<div className='title'>Log in</div>
				<div className='text'>Email or Username (eve.holt@reqres.in)</div>
				<input
					type='text'
					placeholder='Emali or Username...'
					value={email}
					onChange={(e) => setEmail(e.target.value.trim())}
				/>
				<div className='input-2'>
					<input
						type={isShowPassword ? 'text' : 'password'}
						placeholder='Password...'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onKeyDown={(e) => HandlePressEnter(e)}
					/>
					{/* hide/show Passwrd */}
					<i
						className={
							isShowPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
						}
						onClick={() => setIsShowPassword(!isShowPassword)}
					></i>
				</div>
				{/* when enter user and pass input. Then active button */}
				<button
					className={email && password ? 'active' : ''}
					disabled={email && password ? false : true}
					onClick={() => handleLogin()}
				>
					{loadingAPI && <i className='fa-solid fa-sync fa-spin'></i>} Login
				</button>
				<div className='back'>
					<i className='fa-solid fa-angles-left'></i>{' '}
					<span style={{ cursor: 'pointer' }} onClick={() => handleBack()}>
						Go Back
					</span>
				</div>
			</div>
		</>
	);
};

export default Login;
