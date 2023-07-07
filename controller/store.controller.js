const { addToCartService, getProductDetailService, updateStoreService, getSpecificProdutService } = require('../service/store.service');


const storeController = async(req, res) => {

	try {

		let body = req.body;

		if (req.method == "POST") {
			console.log(`body: '${body.product_name}'`)

			let addProduct = await addToCartService(body);

			let specificProdDetail = await getSpecificProdutService(body);

			console.log(`specificProdDetail: '${specificProdDetail.data.prod_qty}'`);

			let updated = await updateStoreService(specificProdDetail.data, body);

			if (addProduct.error) {
				res.status(500).json({
				status: 500,
				message: addProduct.message
				})
			} else {
				res.status(200).json({
					status: 200,
					message: 'Added to cart successfully'
				})
			}	

		} else if (req.method == "GET") {

			let productList = await getProductDetailService(body);
			console.log(`productDetails: '${productList.data[1].details}'`)

			if (productList.error) {
				res.status(500).json({
				status: 500,
				message: productList.message
				})
			} else {
				res.status(200).json({
					status: 200,
					message: productList.data
				})
			}

		}


	} catch (error) {
			res.status(500).json({
				status: 500,
				message: error.message
			})
	}
}

module.exports = storeController;