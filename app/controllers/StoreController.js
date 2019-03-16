import StoreService from "../services/StoreService";
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
        const { name } = req.query;

        console.log(store, name)
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
