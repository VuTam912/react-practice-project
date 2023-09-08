import axios from 'axios';

// xử lý các request và response HTTP.
// Chúng có thể được sử dụng để thêm, sửa đổi hoặc xóa dữ liệu trong
// request hoặc response, hoặc để xử lý các lỗi hoặc phản hồi không mong muốn.

const instance = axios.create({
	baseURL: 'https://reqres.in',
});

// Add a response interceptor
instance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		// if there is no data, then get the status code
		return response.data ? response.data : { statusCode: response.status }; // trả về data
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		let res = {};
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			res.data = error.response.data;
			res.status = error.response.status;
			res.header = error.response.headers;
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser
			// and an instance of http.ClientRequest in node.js
			console.log(error.request);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
		}
		return res;
		// return Promise.reject(error);
	}
);

export default instance;
