import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';

const TableUsers = (props) => {
	//store data ListUsers from api
	const [listUsers, setListUsers] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0); // total users
	const [totalPages, setTotalPages] = useState(0); // total phân trang (paginate)

	// when render component done, useEffect will execute
	useEffect(() => {
		getUsers(1); // 1 - page
	}, []);

	// Call Api should use async await
	const getUsers = async (page) => {
		let res = await fetchAllUser(page);

		//Note: Để tránh API bị error => use if (..)
		if (res && res.data && res.data) {
			console.log(res);
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

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Email</th>
						<th>First Name</th>
						<th>Last Name</th>
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
								</tr>
							);
						})}
				</tbody>
			</Table>
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
		</>
	);
};

export default TableUsers;
