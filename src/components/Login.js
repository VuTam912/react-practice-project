import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
// react-router v6
import { useNavigate } from 'react-router-dom';
import { UserContext } from './../context/UserContext';
import { handleLoginRedux } from '../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
	// chuyen sang trang khi login thanh
	const navigate = useNavigate();
	// send action reducer to execute
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// hide/show Passwrod when onClick on icon
	const [isShowPassword, setIsShowPassword] = useState(false);

	// get state (loading icon for button) from redux
	const isLoading = useSelector((state) => state.user.isLoading);
	const account = useSelector((state) => state.user.account);

	// handle login
	const handleLogin = async () => {
		if (!email || !password) {
			toast.error('Email and Password are required');
			return;
		}

		// use redux
		dispatch(handleLoginRedux(email, password));
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

	useEffect(() => {
		if (account && account.auth === true) {
			navigate('/');
		}
	}, [account]); // neu account nhan duoc su thay doi

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
					onChange={(e) => setEmail(e.target.value)}
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
					{isLoading && <i className='fa-solid fa-sync fa-spin'></i>} Login
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
