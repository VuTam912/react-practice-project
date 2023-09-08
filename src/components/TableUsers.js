import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import './TableUser.scss';
import _ from 'lodash';
import { debounce } from 'lodash';
import { CSVLink, CSVDownload } from 'react-csv';
import Papa from 'papaparse';
import { toast } from 'react-toastify';

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

	// SortBy - Sắp xếp ở các trường.
	const [sortBy, setSortBy] = useState('asc'); // tang dan | desc = giam dam
	const [sortField, setSortField] = useState('id');

	// Search Email by keyword
	const [keyword, setKeyword] = useState('');

	// data Export CSV
	const [dataExport, setDataExport] = useState([]);

	// close the all modals create,del,edit..
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

	// handle Sort by field - Sap xep theo truong
	const handleSort = (sortBy, sortField) => {
		setSortBy(sortBy);
		setSortField(sortField);

		// clone listUsers (giải pháp tạm khi không có backend)
		let cloneListUsers = _.cloneDeep(listUsers);
		cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]); // sortBy = asc,desc
		console.log(cloneListUsers);
	};

	// search by keyword (onChange) - use debounce of lodash and set delay 0.5
	// debounce => de toi uu hieu suat khi nhieu user call api de search
	const handleSearch = debounce((e) => {
		let term = e.target.value;
		console.log(term);
		if (term) {
			// clone listUsers (giải pháp tạm khi không có backend)
			let cloneListUsers = _.cloneDeep(listUsers);
			// filter and search by keyword (term)
			cloneListUsers = cloneListUsers.filter((item) =>
				item.email.includes(term)
			);
			// re-render |Note: Chi tra ket qua search co 1 lan - ko hieu qua khi search nhieu
			setListUsers(cloneListUsers);
		} else {
			getUsers(1); // 1 - page
		}
	}, 500);

	// Customize the fields (trường) to export - tuy chinh cac truong se export file CSV
	// Note:(Not API)
	const getUsersExport = (event, done) => {
		let result = [];
		if (listUsers && listUsers.length > 0) {
			result.push(['Id', 'Email', 'First Name', 'Last Name']); // add title of fields
			listUsers.map((item, index) => {
				let arr = [];
				arr[0] = item.id;
				arr[1] = item.email;
				arr[2] = item.first_name;
				arr[3] = item.last_name;
				result.push(arr);
			});

			// cap nhap status DataExport
			setDataExport(result);
			done(); // library react-csv aviliable
		}
	};

	// Import CSV file - trong file excel muốn import thì nên xóa trường id.
	// To import a CSV file. then should delete the ID Field in file CSV.
	const handleImportCSV = (e) => {
		if (e.target && e.target.files && e.target.files[0]) {
			let file = e.target.files[0];

			// if import wrong file csv file
			if (file.type !== 'text/csv') {
				toast.error('Only accept CSV files...');
				return;
			}
			// console.log('>>> Check file upload: ', file);

			// Execute Import CSV
			Papa.parse(file, {
				// header: true, // loai bo title fields of data
				complete: function (results) {
					let rawCSV = results.data;

					if (rawCSV.length > 0) {
						// check all fields of data - có 3 truờng
						if (rawCSV[0] && rawCSV[0].length === 3) {
							// fields of data
							if (
								rawCSV[0][0] !== 'Email' ||
								rawCSV[0][1] !== 'First_name' ||
								rawCSV[0][2] !== 'Last Name'
							) {
								toast.error('Wrong format Header CSV file');
							} else {
								// if there are fields of data
								let result = [];

								rawCSV.map((item, index) => {
									// loai bo row of field data va check row khong empty
									if (index > 0 && item.length === 3) {
										let obj = {};
										obj.email = item[0];
										obj.first_name = item[1];
										obj.last_name = item[2];
										result.push(obj);
									}
								});
								setListUsers(result); // cap nhap trang thai ListUser de render
								console.log('Check: ', result);
							}
						} else {
							toast.error('Wrong format CSV file');
						}
					} else {
						toast.error('Not found data on file!');
					}
				},
			});
		}
	};

	return (
		<>
			<div className='my-3 add-new'>
				<span>
					<b>List Users:</b>
				</span>
				<div className='group-btns'>
					{/* File hidden */}
					<label htmlFor='test' className='btn btn-warning'>
						<i className='fa-solid fa-file-import'></i> Import
					</label>
					<input
						id='test'
						type='file'
						hidden
						onChange={(e) => handleImportCSV(e)}
					/>
					{/* export Excel - user */}
					<CSVLink
						data={dataExport}
						asyncOnClick={true}
						onClick={getUsersExport}
						filename={'user.csv'}
						className='btn btn-primary'
						target='_blank'
					>
						<i className='fa-solid fa-file-export'></i> Export
					</CSVLink>

					<button
						className='btn btn-success'
						onClick={() => SetIsShowModalAddNew(true)}
					>
						<i className='fa-solid fa-circle-plus '></i> Add new
					</button>
				</div>
			</div>
			<div className='col-4 my-3'>
				<input
					className='form-control'
					placeholder='Search user by email...'
					// value={keyword}
					onChange={(e) => handleSearch(e)}
				/>
			</div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>
							<div className='sort-header'>
								<span>ID</span>
								<span>
									<i
										className='fa-solid fa-arrow-down-long'
										onClick={() => {
											handleSort('desc', 'id');
										}}
									></i>
									<i
										className='fa-solid fa-arrow-up-long'
										onClick={() => handleSort('asc', 'id')}
									></i>
								</span>
							</div>
						</th>
						<th>Email</th>
						<th>
							<div className='sort-header'>
								<span>First Name</span>
								<span>
									<i
										className='fa-solid fa-arrow-down-long'
										onClick={() => {
											handleSort('desc', 'first_name');
										}}
									></i>
									<i
										className='fa-solid fa-arrow-up-long'
										onClick={() => handleSort('asc', 'first_name')}
									></i>
								</span>
							</div>
						</th>

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
