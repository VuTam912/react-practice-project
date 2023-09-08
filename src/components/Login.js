import { useState } from 'react';
import { loginApi } from '../services/UserService';
import { toast } from 'react-toastify';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// hide/show Passwrod when onClick on icon
	const [isShowPassword, setIsShowPassword] = useState(false);

	// handle login
	const handleLogin = async () => {
		if (!email || !password) {
			toast.error('Email and Password are required');
			return;
		}
		// API fake - pass: 'eve.holt@reqres.in'
		let res = await loginApi(email, password);
		if (res && res.token) {
			localStorage.setItem('token', res.token);
		}
	};

	return (
		<>
			{/* Search Google: Breakpoint boostrap: col-sm : =>576px */}
			<div className='login-container col-12 col-sm-4'>
				<div className='title'>Log in</div>
				<div className='text'>Email or Username</div>
				<input
					type='text'
					placeholder='Emali or Username...'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<div className='input-2'>
					<input
						type={isShowPassword ? 'text' : 'password'}
						placeholder='Password...'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
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
					Login
				</button>
				<div className='back'>
					<i className='fa-solid fa-angles-left'></i> Go Back
				</div>
			</div>
		</>
	);
};

export default Login;
