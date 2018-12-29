import axios from 'axios';

export default {
	// get请求
	get (url, params) {
		if (!url) {
			console.log(params);
		}
		return new Promise((resolve, reject) => {
			if (!url || !params) {
				reject(new Error('not params...'));
			}
			axios.get(url, {params})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	// post请求
	post (url, params) {
		return new Promise((resolve, reject) => {
			if (!url || !params) {
				reject(new Error('not params...'));
			}
			axios.post(url, {params})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	}
};
