import { Alert } from 'react-bootstrap';

const NotFound = () => {
	// 404 Not Found
	return (
		<>
			<div className='mt-3'>
				<Alert variant='light'>
					<Alert.Heading>404 - Not Found.</Alert.Heading>
				</Alert>
			</div>
		</>
	);
};

export default NotFound;
