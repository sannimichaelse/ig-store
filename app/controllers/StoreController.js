import StoreService from "../services/StoreService";
import ProductService from "../services/ProductService"

/**
 * @exports
 * @class StoreController
 */
class StoreController {
    /**
     * Creates a new user
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static createNewStore(req, res) {
        const { data } = req.decoded;
        // console.log(`Logged in user id  ${data}`);

        StoreService.saveNewStore(req.body, data)
            .then(result => {
                // console.log(result);
                return res.status(201).json({
                    statusMessage: "New Store created successfully"
                });
            })
            .catch(err => {
                console.log(err)
                if (err.rows) {
                    return res.status(400).json({
                        statusMessage: `Store with this name ${
                            err.rows[0].storename
                            } exists already`
                    });
                } else {
                    return res.status(400).json({
                        statusMessage: "Could not save store"
                    });
                }
            });
    }
    /**
     * Update a store
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static updateStore(req, res) {
        const { data } = req.decoded;
        const { id } = req.params;
        // console.log(`Logged in user id  ${data}`);
        StoreService.updateStore(req.body, data, id)
            .then(result => {
                // console.log(result);
                return res.status(200).json({
                    statusMessage: "Store updated successfully"
                });
            })
            .catch(err => {
                if (err == "store not found") {
                    return res.status(404).json({
                        statusMessage: "Store with id not found"
                    });
                }
                return res.status(400).json({
                    statusMessage: "Error Updating Store"
                });
            });
    }
    /**
     * Get store by id
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static findStoreById(req, res) {
        const { data } = req.decoded;
        const { id } = req.params;
        // console.log(`Logged in user id  ${data}`);
        StoreService.findStoreById(data, id)
            .then(result => {
                // console.log(result);
                return res.status(200).json({
                    statusMessage: "Successfully fetched store",
                    data: result.rows[0]
                });
            })
            .catch(err => {
                if (err.responseCode == "01") {
                    return res.status(404).json({
                        statusMessage: "Store does not exist"
                    });
                }

                return res.status(400).json({
                    statusMessage: "Error fetching store"
                });
            });
    }
    /**
    * Get store by name
    * @staticmethod
    * @param  {object} req - user object
    * @param {object} res - Response object
    * @return {json} res.json
    */
    static findStoreByName(req, res) {
        const { data } = req.decoded;
        const { store } = req.params;
        const { name, page, store_id } = req.query;
        console.log(req.query)

        console.log("from store " + store, name, page, store_id)
        if (store == "store") {
            StoreService.findStoreByName(data, name)
                .then(result => {
                    req.params = {};
                    req.query = {};
                    return res.status(200).json({
                        statusMessage: "Successfully fetched store",
                        data: result.rows[0]
                    });
                })
                .catch(err => {
                    //console.log(err)
                    req.params = {};
                    req.query = {};
                    if (err.responseCode == "01") {
                        return res.status(404).json({
                            statusMessage: "Store does not exist"
                        });
                    }

                    return res.status(400).json({
                        statusMessage: "Error fetching store"
                    });
                });
        } else if (Object.keys(req.query).length == "1") {
            if (req.query.page == "") {
                return res.status(400).json({
                    statusMessage: "Page number cannot be empty"
                });
            }
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
        } else if (Object.keys(req.query).length == "2") {
            console.log('got here')
            if (req.query.page == "" || req.query.store_id == "") {
                return res.status(400).json({
                    statusMessage: "Page number and store id cannot be empty"
                });
            }
            ProductService.getAllProductsInStore(data, page, store_id)
                .then(result => {
                    // console.log(result);
                    return res.status(200).json({
                        statusMessage:
                            "Successfully fetched all products in Store created by StoreID",
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

    }
    /**
     * Get store by id
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static getAllStoresCreatedByUser(req, res) {
        const { data } = req.decoded;
        // console.log(`Logged in user id  ${data}`);
        StoreService.getAllStoresCreatedByUser(data)
            .then(result => {
                // console.log(result);
                return res.status(200).json({
                    statusMessage:
                        "Successfully fetched all stores created by user",
                    data: result
                });
            })
            .catch(err => {
                if (err.responseCode == "01") {
                    return res.status(400).json({
                        statusMessage: "No store created by user yet"
                    });
                }
                return res.status(400).json({
                    statusMessage: "Error fetching store"
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
    static deleteStoreById(req, res) {
        const { data } = req.decoded;
        const { id } = req.params;
        // console.log(`Logged in user id  ${data}`);
        StoreService.deleteStoreById(data, id)
            .then(result => {
                // console.log(result);
                return res.status(200).json({
                    statusMessage: "Successfully deleted store"
                });
            })
            .catch(err => {
                if (err.responseCode == "01") {
                    return res.status(404).json({
                        statusMessage: err.responseMessage
                    })
                }
                return res.status(400).json({
                    statusMessage: "Error deleting store"
                });
            });
    }
}

export default StoreController;
