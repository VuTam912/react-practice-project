import React, { createContext, useState } from 'react';

/**
 *
 * useContext là một hook trong React được sử dụng để truy cập dữ liệu từ Context API.
 * Context API cho phép bạn chia sẻ dữ liệu global trong ứng dụng React mà không
 * cần truyền props qua nhiều cấp component.
 *
 */

// Function UserConttext
const UserContext = createContext({ name: '', auth: false });

// Function UserProvider
// Create function to provide UserConttext
// children => components
const UserProvider = ({ children }) => {
	const [user, setUser] = useState({ email: '', auth: false });

	// ham nay se su ly cap nhap State va thong bao cho tat ca component hoac cac component truy cap
	const loginContext = (email, token) => {
		//setUser => const [user, "setUser"] = useState...
		setUser((user) => ({
			email: email,
			auth: true,
		}));
		localStorage.setItem('token', token);
		localStorage.setItem('email', email);
	};

	const logout = () => {
		// xoa localstorage và logout
		localStorage.removeItem('token');
		localStorage.removeItem('email');
		setUser((user) => ({
			email: '',
			auth: false,
		}));
	};

	return (
		<UserContext.Provider value={{ user, loginContext, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
