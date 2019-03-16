import bcrypt from "bcrypt";
import moment from "moment";
import randomstring from "randomstring";
import db from "../../config/connection/connect";

const obj = {};
const err = {};

/**
 * @exports
 * @class StoreQueries
 */
class StoreQueries {
    /**
     * Find store by name
     * @staticmethod
     * @param  {string} name - Request object
     * @return {string} res
     */
    static findStoreByNameQuery(userId, storeName) {
        console.log(userId, storeName);
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM stores WHERE storename = '${storeName}' AND created_by_user_id = '${userId}'`;
            db.query(query)
                .then(result => {
                    if (result.rowCount === 0) {
                        err.responseMessage = "store does not exist";
                        err.responseCode = "01";
                        reject(err);
                    } else if (result.rowCount >= 1) {
                        obj.rowCount = result.rowCount;
                        obj.rows = result.rows;
                        resolve(obj);
                    }
                })
                .catch(e => {
                    console.log(e);
                    err.responseMessage = "Error Finding Store";
                    err.responseCode = "02";
                    reject(err);
                });
        });
    }
    /**
     * save new store
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static saveNewStoreQuery(body, id) {
        const {
            storename
        } = body;

        const d = new Date();
        const added_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
        return new Promise((resolve, reject) => {
            this.findStoreByNameQuery(id, storename)
                .then(err => {
                    console.log(err);
                    reject(err);
                })
                .catch(res => {
                    const queryBody = `INSERT INTO stores(created_by_user_id, updated_at, added_at, storename)
                              VALUES ('${id}', '${added_at}', '${added_at}', '${storename}')`;
                    db.query(queryBody)
                        .then(result => {
                            if (result.rowCount >= 1) {
                                resolve("Data Saved");
                            } else if (result.rowCount === 0) {
                                console.log("got here", result);
                                reject(result);
                            }
                        })
                        .catch(e => {
                            console.log("e", e);
                            reject("Error Saving New Store");
                        });
                });
        });
    }
    /**
     * update store
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static updateStoreQuery(body, id, storeId) {
        const {
            name
        } = body;

        const d = new Date();
        const updated_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
        return new Promise((resolve, reject) => {
            const queryBody = `UPDATE stores 
            SET storename = '${name}', 
                updated_at = '${updated_at}'
            WHERE 
                id = '${storeId}' AND created_by_user_id = '${id}'`;
            db.query(queryBody)
                .then(result => {
                    if (result.rowCount >= 1) {
                        resolve("Data Saved");
                    } else if (result.rowCount === 0) {
                        //console.log("got here", result);
                        reject("store not found");
                    }
                })
                .catch(e => {
                    // console.log("e", e);
                    reject("Error Saving New User");
                });
        });
    }
    /**
     * Find store by id
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */
    static findStoreByIdQuery(userId, storeId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM stores WHERE id = '${storeId}' AND created_by_user_id = '${userId}'`;
            db.query(query)
                .then(result => {
                    if (result.rowCount === 0) {
                        err.responseMessage = "Store does not exist";
                        err.responseCode = "01";
                        reject(err);
                    } else if (result.rowCount >= 1) {
                        obj.rowCount = result.rowCount;
                        obj.rows = result.rows;
                        resolve(obj);
                    }
                })
                .catch(e => {
                    console.log(e);
                    err.responseMessage = "Error Finding store/Invalid Store ID";
                    err.responseCode = "02";
                    reject(err);
                });
        });
    }
    /**
     * find all stores created by user
     * @staticmethod
     * @param  {string} userId - Request object
     * @return {string} res
     */
    static findAllStoresCreatedByUserQuery(userId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM stores WHERE created_by_user_id = '${userId}'`;
            db.query(query)
                .then(result => {
                    if (result.rowCount === 0) {
                        err.responseMessage = "No store created by user yet";
                        err.responseCode = "01";
                        reject(err);
                    } else if (result.rowCount >= 1) {
                        obj.rowCount = result.rowCount;
                        obj.rows = result.rows;
                        resolve(obj);
                    }
                })
                .catch(e => {
                    // console.log(e);
                    err.responseMessage = "Error fetching store";
                    err.responseCode = "02";
                    reject(err);
                });
        });
    }
    /**
     * Delete store by id query
     * @staticmethod
     * @param  {string} userId - Request object
     * @param  {string} storeId - Request object
     * @return {string} res
     */
    static deleteStoreByIdQuery(userId, storeId) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM stores WHERE created_by_user_id = '${userId}' AND id = '${storeId}'`;
            db.query(query)
                .then(result => {
                    if (result.rowCount === 0) {
                        // console.log("Del " + result);
                        err.responseMessage = "No store with id";
                        err.responseCode = "01";
                        reject(err);
                    } else if (result.rowCount >= 1) {
                        // console.log("del " + result);
                        obj.rowCount = result.rowCount;
                        obj.rows = result.rows;
                        resolve(obj);
                    }
                })
                .catch(e => {
                    // console.log(e);
                    err.responseMessage = "Error fetching store";
                    err.responseCode = "02";
                    reject(err);
                });
        });
    }
}

export default StoreQueries;
