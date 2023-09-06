import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';

const TableUsers = (props) => {
	//store data ListUsers from api
	const [listUsers, setListUsers] = useState([]);

	// when render component done, useEffect will execute
	useEffect(() => {
		getUsers();
	}, []);

	// Call Api should use async await
	const getUsers = async () => {
		let res = await fetchAllUser();

		//Note: Để tránh API bị error => use if (..)
		if (res && res.data && res.data) {
			setListUsers(res.data); // store data ListUsers and it will re-render again
		}
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
		</>
	);
};

export default TableUsers;
