import { Button, Modal, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { postCreateUser } from '../services/UserService';
import { toast } from 'react-toastify';

// EDIT USER
const ModalEditUser = (props) => {
	const { show, handleClose, dataUserEdit } = props;
	const [name, setName] = useState('');
	const [job, setJob] = useState('');

	const handleEditUser = () => {
		console.log('');
	};

	// cap nhap gan gia tri edit o Effect
	useEffect(() => {
		if (show) {
			setName(dataUserEdit.first_name);
		}
	}, [dataUserEdit]); // dataUserEdit se cap nhap theo

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit new user</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								value={name}
								onChange={(event) => setName(event.target.value)}
							/>
						</Form.Group>

						<Form.Group className='mb-3'>
							<Form.Label>Job</Form.Label>
							<Form.Control
								type='text'
								value={job}
								onChange={(event) => setJob(event.target.value)}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={() => handleEditUser()}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalEditUser;
