const db = require('../db/db.config');

const addToCartService = (requestData) => {

	return new Promise((resolve, reject) => {

		console.log(`requestData: '${requestData.email}'`);

		let userDataQuery = `INSERT INTO user_cart(email, prod_id, prod_name, prod_qty, prod_price) VALUES ('${requestData.email}', '${requestData.prod_id}', '${requestData.prod_name}', '${requestData.prod_qty}', '${requestData.prod_price}')`;

		db.query(userDataQuery, (err, res) => {
			if (err) {
				resolve({
					error: true,
					message: err.message
				})
			} else {
				resolve({
					error: false,
					message: 'success',
					data: res
				})
			}
		})
	})
}

const getProductDetailService = (requestData) => {

	return new Promise((resolve, reject) => {

		let getProdQuery = `SELECT * FROM store`;

		db.query(getProdQuery, (err, res) => {

			console.log(`res: '${JSON.stringify(res[1])}'`)

			console.log(`res length: '${res.length}'`);

			let productListJson = "";

			for (i=0; i<res.length; i++) {
				productListJson += JSON.stringify(res[i]);
			}

			console.log(`productListJson: '${productListJson}'`);

			if (err) {
				resolve({
					error: true,
					message: err.message
				})
			} else {
				resolve({
					error: false,
					message: 'success',
					data: productListJson
				})
			}			
		})

	})

}

const getSpecificProdutService = (requestData) => {

	return new Promise((resolve, reject) => {

		console.log(`getSpec: '${requestData.prod_name}'`)

		let prodDetailQuery = `SELECT * FROM store WHERE prod_name='${requestData.prod_name}'`;

		db.query(prodDetailQuery, (err, res) => {

			console.log(res[0].prod_qty);

			if (err) {
				resolve({
					error: true,
					message: err.message
				})
			} else {
				resolve({
					error: false,
					message: 'success',
					data: res[0]
				})
			}

		})

	})

}

const updateStoreService = (product, requestData) => {

	return new Promise ((resolve, reject) => {

		console.log(`qty: '${product.prod_qty}'`)

		let new_value = product.prod_qty - requestData.prod_qty;

		let updateStoreQuery = `UPDATE store set prod_qty='${new_value}' WHERE prod_name='${requestData.prod_name}'`;

		db.query(updateStoreQuery, (err, res) => {

			if (err) {
				resolve({
					error: true,
					message: err.message
				})
			} else {
				resolve({
					error: false,
					message: 'success',
				})
			}						
		})

	})

}

module.exports = {
	addToCartService, getProductDetailService, updateStoreService, getSpecificProdutService
};