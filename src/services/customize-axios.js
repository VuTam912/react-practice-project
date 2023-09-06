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
		return response.data; // trả về data
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

export default instance;
