import { Button, Modal, Form } from 'react-bootstrap';
import { deleteUser } from '../services/UserService';
import { toast } from 'react-toastify';

const ModalConfirm = (props) => {
	const { show, handleClose, dataUserDelete, handleDeleteUserFormModal } =
		props;

	// Call api to Delete user
	const confirmDelete = async () => {
		let res = await deleteUser(dataUserDelete.id);

		// Status : 204 => OK | +res => convert string to interger type
		if (res && +res.statusCode === 204) {
			toast.success('Delete user successfully');
			handleDeleteUserFormModal(dataUserDelete);
			handleClose();
		} else {
			toast.error('Error delete user');
		}
	};

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Delete a user</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='body-add-new'>
						this action can't be undone! Do you want to delete this user ?
						<br />
						<b>Email: {dataUserDelete.email} ?</b>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={() => confirmDelete()}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalConfirm;
