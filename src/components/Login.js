import { useState } from 'react';

const Login = () => {
	const [emial, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// hide/show Passwrod when onClick on icon
	const [isShowPassword, setIsShowPassword] = useState(false);

	return (
		<>
			{/* Search Google: Breakpoint boostrap: col-sm : =>576px */}
			<div className='login-container col-12 col-sm-4'>
				<div className='title'>Log in</div>
				<div className='text'>Email or Username</div>
				<input
					type='text'
					placeholder='Emali or Username...'
					value={emial}
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
				<button className={emial && password ? 'active' : ''} disabled={true}>
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
