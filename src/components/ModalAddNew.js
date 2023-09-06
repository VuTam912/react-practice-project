import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';

const ModalAddNew = (props) => {
	const { show, handleClose } = props;
	const [name, setName] = useState('');
	const [job, setJob] = useState('');

	const handleSaveUser = () => {
		console.log('>>check state: ', 'name = ', name, 'job = ', job);
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add new user</Modal.Title>
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
					<Button variant='primary' onClick={() => handleSaveUser()}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalAddNew;
