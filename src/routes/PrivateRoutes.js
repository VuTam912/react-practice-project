import { Routes, Route } from 'react-router-dom';

import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

// Private danh cho khi nguoi dung dang nhap thanh cong thi TableUser se hien thi con khong thi alert

const PrivateRoutes = (props) => {
	const user = useSelector((state) => state.user.account);

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
