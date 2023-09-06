import { Container, Row } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import ModalAddNew from './components/ModalAddNew';
import { useState } from 'react';

function App() {
	const [isShowModalAddNew, SetIsShowModalAddNew] = useState(false);

	// close the modal
	const handleClose = () => {
		SetIsShowModalAddNew(false);
	};
	return (
		<div className='app-container'>
			<Header />
			<Container>
				<div className='my-3 add-new'>
					<span>
						<strong>List Users:</strong>
					</span>
					<button
						className='btn btn-success'
						onClick={() => SetIsShowModalAddNew(true)}
					>
						Add new user
					</button>
				</div>
				<TableUsers />
			</Container>

			<ModalAddNew show={isShowModalAddNew} handleClose={handleClose} />
		</div>
	);
}

export default App;
