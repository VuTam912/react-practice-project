import { Routes, Route } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { Alert } from 'react-bootstrap';

// Private danh cho khi nguoi dung dang nhap thanh cong thi TableUser se hien tren menu

const PrivateRoutes = (props) => {
	const { user } = useContext(UserContext);

	// if the user has not yet logged in (đăng nhập)
	if (user && !user.auth) {
		return (
			<>
				<Alert variant='danger' className='mt-3'>
					<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
					<p>You don't have permisson to access this route.</p>
				</Alert>
			</>
		);
	}
	//  nếu đã login thì chuyển tới tableUser = component là children
	return <>{props.children}</>;
};

export default PrivateRoutes;
