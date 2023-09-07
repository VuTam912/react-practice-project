import { Button, Modal, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { postCreateUser, putUpdateUser } from '../services/UserService';
import { toast } from 'react-toastify';

// EDIT USER
const ModalEditUser = (props) => {
	// tu dataUserEdit from Parent Component
	const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
	const [name, setName] = useState('');
	const [job, setJob] = useState('');

	// Apply Update User by ID
	const handleEditUser = async () => {
		let res = await putUpdateUser(name, job);

		// Update success
		if (res && res.updatedAt) {
			handleEditUserFromModal({ first_name: name, id: dataUserEdit.id });
			handleClose();
			setName('');
			setJob('');
			// Add Dialog successfully
			toast.success('Update is create succeed!');
		} else {
			//error
			toast.error('An error...');
		}
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
