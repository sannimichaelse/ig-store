import ProductService from "../services/ProductService";
/**
 * @exports
 * @class ProductController
 */
class ProductController {
    /**
     * Creates a new user
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static createNewProduct(req, res) {
        const { data } = req.decoded;
        ProductService.saveNewProduct(req.body, data)
            .then(result => {
                // console.log(result);
                return res.status(201).json({
                    statusMessage: "New Product created successfully"
                });
            })
            .catch(err => {
                console.log(err);
                if (err.rows) {
                    return res.status(400).json({
                        statusMessage: `Product with name ${
                            err.rows[0].productname
                            } exists already`
                    });
                } else if (err.responseCode == "01") {
                    return res.status(404).json({
                        statusMessage: err.responseMessage
                    });
                } else if (err.responseCode == "02") {
                    return res.status(400).json({
                        statusMessage: err.responseMessage
                    });
                } else {
                    return res.status(400).json({
                        statusMessage: "Error Saving Product"
                    });
                }
            });
    }
    /**
     * Update a Product
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static updateProduct(req, res) {
        const { data } = req.decoded;
        const { id } = req.params;
        // console.log(`Logged in user id  ${data}`);
        ProductService.updateProduct(req.body, data, id)
            .then(result => {
                // console.log(result);
                return res.status(200).json({
                    statusMessage: "Product updated successfully"
                });
            })
            .catch(err => {
                if (err == "Product not found") {
                    return res.status(404).json({
                        statusMessage: "Product with id not found"
                    });
                }
                return res.status(400).json({
                    statusMessage: "Error Updating Product"
                });
            });
    }
    /**
     * Get Product by id
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static findProductById(req, res) {
        const { data } = req.decoded;
        const { id } = req.params;
        // console.log(`Logged in user id  ${data}`);
        ProductService.findProductById(data, id)
            .then(result => {
                // console.log(result);
                return res.status(200).json({
                    statusMessage: "Successfully fetched Product",
                    data: result.rows[0]
                });
            })
            .catch(err => {
                if (err.responseCode == "01") {
                    return res.status(404).json({
                        statusMessage: "Product does not exist"
                    });
                }

                return res.status(400).json({
                    statusMessage: "Error fetching Product/Invalid Product ID"
                });
            });
    }
    /**
    * Get Product by name
    * @staticmethod
    * @param  {object} req - user object
    * @param {object} res - Response object
    * @return {json} res.json
    */
    static findProductByName(req, res) {
        const { data } = req.decoded;
        const { Product } = req.params;
        const { name } = req.query;

        ProductService.findProductByName(data, name)
            .then(result => {
                // console.log(result);
                return res.status(200).json({
                    statusMessage: "Successfully fetched Product",
                    data: result.rows[0]
                });
            })
            .catch(err => {
                //console.log(err)
                if (err.responseCode == "01") {
                    return res.status(404).json({
                        statusMessage: "Product does not exist"
                    });
                }

                return res.status(400).json({
                    statusMessage: "Error fetching Product"
                });
            });
    }
    /**
     * Get Product by id
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static getAllProductsCreatedByUser(req, res) {
        const { data } = req.decoded;
        const { products } = req.params;
        const { page } = req.query;
        console.log(page, products)
        ProductService.getAllProductsCreatedByUser(data, page)
            .then(result => {
                req.params = {};
                req.query = {};
                // console.log(result);
                return res.status(200).json({
                    statusMessage:
                        "Successfully fetched all Products created by user",
                    data: result
                });
            })
            .catch(err => {
                req.params = {};
                req.query = {};
                return res.status(400).json({
                    statusMessage: "Error fetching Product"
                });
            });
    }
    /**
     * Get Product by id
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static getAllProductsInStore(req, res) {
        const { data } = req.decoded;
        const { products } = req.params;
        const { page, store_id } = req.query;
        console.log(page, products, store_id)
        ProductService.getAllProductsInStore(data, page, store_id)
            .then(result => {
                // console.log(result);
                return res.status(200).json({
                    statusMessage:
                        "Successfully fetched all products in Store created by User",
                    data: result
                });
            })
            .catch(err => {
                if (err.responseCode == "02") {
                    return res.status(400).json({
                        statusMessage: err.responseMessage
                    });
                }
                return res.status(400).json({
                    statusMessage: "Error fetching Product in Store"
                });
            });
    }
    /**
     * Delete by id
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static deleteProductById(req, res) {
        const { data } = req.decoded;
        const { id } = req.params;
        // console.log(`Logged in user id  ${data}`);
        ProductService.deleteProductById(data, id)
            .then(result => {
                // console.log(result);
                return res.status(200).json({
                    statusMessage: "Successfully deleted Product"
                });
            })
            .catch(err => {
                if (err.responseCode == "01") {
                    return res.status(404).json({
                        statusMessage: err.responseMessage
                    })
                }
                return res.status(400).json({
                    statusMessage: "Error deleting Product"
                });
            });
    }
}

export default ProductController;
