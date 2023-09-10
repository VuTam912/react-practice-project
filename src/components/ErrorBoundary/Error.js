// Error Boundaries trong React là một tính năng giúp bạn quản lý và xử lý các lỗi xảy ra trong các thành phần của
// ứng dụng React mà không làm cho toàn bộ ứng dụng React bị "đóng cửa sổ" hoặc gặp lỗi nghiêm trọng. Khi một lỗi
// xảy ra trong một thành phần con của ứng dụng React, nó có thể lan rộng lên đến các thành phần cha và gây ra sự cố toàn bộ ứng dụng.
// Tuy nhiên, với Error Boundaries, bạn có thể xác định các thành phần cha cụ thể để "bắt" lỗi và xử lý chúng một cách an toàn.

import React, { Component } from 'react';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		// logErrorToMyService(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI (UI du phong de show error)
			return <h1>Something went wrong.</h1>;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
