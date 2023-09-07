import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import _ from 'lodash';

const TableUsers = (props) => {
	//store data ListUsers from api
	const [listUsers, setListUsers] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0); // total users
	const [totalPages, setTotalPages] = useState(0); // total phân trang (paginate)

	// Modal
	const [isShowModalAddNew, SetIsShowModalAddNew] = useState(false);
	const [isShowModalEdit, SetIsShowModalEdit] = useState(false);
	const [isShowModalDelete, SetIsShowModalDelete] = useState(false);

	// Data Edit - dataUserEdit se chuyen qua ModalEditUser
	const [dataUserEdit, setDataUserEdit] = useState({});
	// Data delete
	const [dataUserDelete, setDataUserDelete] = useState({});

	// close the all modals
	const handleClose = () => {
		SetIsShowModalAddNew(false);
		SetIsShowModalEdit(false);
		SetIsShowModalDelete(false);
	};

	// when render component done,then useEffect will execute
	useEffect(() => {
		getUsers(1); // 1 - page
	}, []);

	// cap nhap render table when click save in Modal => nhờ chuyền props qua Modal de call
	const handleUpdateTable = (user) => {
		// chen vi tri dau
		setListUsers([user, ...listUsers]);
	};

	// Do la API fake nen phai update theo cách khác - nen khong the re-render table
	const handleEditUserFromModal = (user) => {
		//find index to update user
		let index = listUsers.findIndex((item) => item.id === user.id);
		// Do không dùng MySQL nên phải tạo biến phụ để cập nhập được.
		// let cloneListUser = [...listUsers]; // sao chep - method 1
		let cloneListUser = _.cloneDeep(listUsers); // sao chep - method 2; Either way is fine.

		cloneListUser[index].first_name = user.first_name; // gan value moi vao index
		setListUsers(cloneListUser);
	};

	// Call Api should use async await
	const getUsers = async (page) => {
		let res = await fetchAllUser(page);

		//Note: Để tránh API bị error => use if (..)
		if (res && res.data && res.data) {
			setTotalUsers(res.total); // total of users
			setListUsers(res.data); // store data ListUsers and it will re-render again
			setTotalPages(res.total_pages); // total of pages
		}
	};

	// handle Paginate (phân trang)
	const handlePageClick = (event) => {
		console.log(event);
		// cap nhap chuyen trang page
		getUsers(event.selected + 1);
	};

	// Edit user and show modal
	const handleEditUser = (user) => {
		setDataUserEdit(user);
		SetIsShowModalEdit(true);
	};

	// Delete user
	const handleDeleteUser = (user) => {
		SetIsShowModalDelete(true);
		setDataUserDelete(user);
	};

	// After called APi done, then table be re-render component
	const handleDeleteUserFormModal = (user) => {
		let cloneListUsers = _.cloneDeep(listUsers); // clone or gan vao

		cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id); // filter id not equal user.id

		setListUsers(cloneListUsers); // update listUsers
	};
	return (
		<>
			<div className='my-3 add-new'>
				<span>
					<b>List Users:</b>
				</span>
				<button
					className='btn btn-success'
					onClick={() => SetIsShowModalAddNew(true)}
				>
					Add new user
				</button>
			</div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Email</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{listUsers &&
						listUsers.length > 0 &&
						listUsers.map((item, index) => {
							return (
								<tr key={`users-${index}`}>
									<td>{item.id}</td>
									<td>{item.email}</td>
									<td>{item.first_name}</td>
									<td>{item.last_name}</td>
									<td>
										<button
											className='btn btn-warning mx-2'
											onClick={() => handleEditUser(item)}
										>
											Edit
										</button>
										<button
											className='btn btn-danger'
											onClick={() => handleDeleteUser(item)}
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</Table>
			{/* Phân trang Page */}
			<ReactPaginate
				nextLabel='next >'
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				// marginPagesDisplayed={2}
				pageCount={totalPages}
				previousLabel='< previous'
				pageClassName='page-item'
				pageLinkClassName='page-link'
				previousClassName='page-item'
				previousLinkClassName='page-link'
				nextClassName='page-item'
				nextLinkClassName='page-link'
				breakLabel='...'
				breakClassName='page-item'
				breakLinkClassName='page-link'
				containerClassName='pagination'
				activeClassName='active'
			/>
			{/* Modal: add,edit,del */}
			<ModalAddNew
				show={isShowModalAddNew}
				handleClose={handleClose}
				handleUpdateTable={handleUpdateTable} // re-render the table when update,create...
			/>
			<ModalEditUser
				show={isShowModalEdit}
				dataUserEdit={dataUserEdit}
				handleClose={handleClose}
				handleEditUserFromModal={handleEditUserFromModal} // re-render the table when update,create...
			/>
			<ModalConfirm
				show={isShowModalDelete}
				handleClose={handleClose}
				dataUserDelete={dataUserDelete}
				handleDeleteUserFormModal={handleDeleteUserFormModal}
			/>
		</>
	);
};

export default TableUsers;
