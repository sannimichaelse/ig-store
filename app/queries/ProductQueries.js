import bcrypt from "bcrypt";
import moment from "moment";
import db from "../../config/connection/connect";
import ProductQuery from "../queries/ProductQueries"
import StoreQueries from "./StoreQueries";

const obj = {};
const err = {};
/**
 * @exports
 * @class ProductQueries
 */
class ProductQueries {
    /**
  * Find product by name
  * @staticmethod
  * @param  {string} name - Request object
  * @return {string} res
  */
    static findProductByNameQuery(name) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM products WHERE productname = '${name}'`;
            db.query(query)
                .then(result => {
                    if (result.rowCount === 0) {
                        err.responseMessage = "product does not exist";
                        err.responseCode = "01";
                        reject(err);
                    } else if (result.rowCount >= 1) {
                        obj.rowCount = result.rowCount;
                        obj.rows = result.rows;
                        resolve(obj);
                    }
                })
                .catch(e => {
                    err.responseMessage = "Error Finding Product";
                    err.responseCode = "02";
                    reject(err);
                });
        });
    }
    /**
     * Find product by id
     * @staticmethod
     * @param  {string} id - Request object
     * @return {string} res
     */
    static findProductByIdQuery(userId, productId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM products WHERE id = '${productId}' AND created_by_user_id = '${userId}'`;
            db.query(query)
                .then(result => {
                    if (result.rowCount === 0) {
                        err.responseMessage = "product does not exist";
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
                    err.responseMessage = "Error Finding Product";
                    err.responseCode = "02";
                    reject(err);
                });
        });
    }
    /**
     * save new product
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static saveProductQuery(body, id) {
        const {
            productname,
            price,
            tags,
            store_id,
            category,
            image_url
        } = body;

        const d = new Date();
        const added_at = moment(d).format("YYYY-MM-DD HH:mm:ss");

        return new Promise((resolve, reject) => {
            this.findProductByNameQuery(productname)
                .then(err => {
                    reject(err);
                })
                .catch(res => {
                    console.log(res)
                    StoreQueries.findStoreByIdQuery(id, store_id).then((res) => {
                        const queryBody = `
                              INSERT INTO products(created_by_user_id, store_id, added_at, updated_at, productname, price, image_url, tags, category) 
                              VALUES ('${id}', '${store_id}','${added_at}','${added_at}','${productname}','${price}','${image_url || "null"}','${tags || "null"}','${category || "null"}')`;
                        db.query(queryBody)
                            .then(result => {
                                if (result.rowCount >= 1) {
                                    resolve("Data Saved");
                                } else if (result.rowCount === 0) {
                                    console.log("got here", result);
                                    reject("Could Not Save Product");
                                }
                            })
                            .catch(e => {
                                console.log("e", e);
                                reject("Error Saving New Product");
                            });
                    }).catch((err) => {
                        reject(err)
                    })
                });
        });
    }
    static updatePasswordByTokenQuery(newpassword, token) {
        const d = new Date();
        const updated_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
        return new Promise((resolve, reject) => {
            this.verifySecretTokenQuery(token)
                .then(err => {
                    // console.log("verified", token);
                    bcrypt.hash(newpassword, saltRounds).then(hash => {
                        // console.log(hash, token);
                        const queryBody = `
                    UPDATE users
                        SET password = '${hash}', updated_at = '${updated_at}'
                    WHERE
                        secret_token = '${token}'`;
                        db.query(queryBody)
                            .then(result => {
                                if (result.rowCount >= 1) {
                                    resolve("Data Saved");
                                } else if (result.rowCount === 0) {
                                    // console.log("got here", result);
                                    reject("Could Not Save User");
                                }
                            })
                            .catch(e => {
                                // console.log("e", e);
                                reject("Error Saving New User");
                            });
                    });
                })
                .catch(res => {
                    reject(res);
                });
        });
    }
    /**
     * update signup
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static updateSignupQuery(body, id) {
        const {
            firstname,
            lastname,
            gender,
            date_of_birth,
            phone_number,
            image_url,
            oauth_type,
            oauth_id,
            state_code,
            city_code,
            country_code,
            address
        } = body;

        const d = new Date();
        const updated_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
        const completed = "yes";

        return new Promise((resolve, reject) => {
            this.findUserByIdQuery(id)
                .then(res => {
                    const queryBody = `
                    UPDATE users
                        SET updated_at = '${updated_at}',
                        firstname = '${firstname}',
                        lastname = '${lastname}',
                        gender = '${gender}',
                        date_of_birth = '${date_of_birth}',
                        phone_number = '${phone_number}',
                        image_url = '${image_url}',
                        oauth_type = '${oauth_type}',
                        oauth_id = '${oauth_id}',
                        state_code = '${state_code}',
                        city_code = '${city_code}',
                        country_code = '${country_code}',
                        address = '${address}',
                        completed = '${completed}'
                    WHERE
                        id = '${id}'`;
                    db.query(queryBody)
                        .then(result => {
                            if (result.rowCount >= 1) {
                                resolve("Data Saved");
                            } else if (result.rowCount === 0) {
                                // console.log("got here", result);
                                console.log(result)
                                reject("Could Not Save User");
                            }
                        })
                        .catch(e => {
                            console.log("e", e);
                            reject("Error Saving New User");
                        });
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    /**
     * find all Products created by user
     * @staticmethod
     * @param  {string} userId - Request object
     * @return {string} res
     */
    static findAllProductsCreatedByUserQuery(userId, pageNo) {
        return new Promise((resolve, reject) => {
            let limit;
            switch (pageNo) {
                case "1":
                    limit = 2;
                    break;
                case "2":
                    limit = 4;
                    break;
                default:
                    limit = "";
                    break;
            }

            const query = `SELECT * FROM products WHERE created_by_user_id = '${userId}' LIMIT '${limit}' `;
            db.query(query)
                .then(result => {
                    if (result.rowCount === 0) {
                        err.responseMessage = "No Product created by user yet";
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
                    err.responseMessage = "Error fetching Product";
                    err.responseCode = "02";
                    reject(err);
                });
        });
    }
    /**
 * find all Products in store
 * @staticmethod
 * @param  {string} userId - Request object
 * @return {string} res
 */
    static findAllProductsInStoreQuery(userId, pageNo, storeId) {
        return new Promise((resolve, reject) => {
            let limit;
            switch (pageNo) {
                case "1":
                    limit = 2;
                    break;
                case "2":
                    limit = 4;
                    break;
                default:
                    limit = "";
                    break;
            }
            console.log(userId, pageNo, storeId)
            StoreQueries.findStoreByIdQuery(userId, storeId).then((res) => {
                const query = `SELECT * FROM products WHERE created_by_user_id = '${userId}' AND store_id = '${storeId}' LIMIT '${limit}' `;
                db.query(query)
                    .then(result => {
                        if (result.rowCount === 0) {
                            err.responseMessage = "No Product in Store";
                            err.responseCode = "01";
                            reject(err);
                        } else if (result.rowCount >= 1) {
                            obj.rowCount = result.rowCount;
                            obj.rows = result.rows;
                            resolve(obj);
                        }
                    })
                    .catch(e => {
                        err.responseMessage = "Error fetching Product in Store";
                        err.responseCode = "03";
                        reject(err);
                    });
            }).catch((err) => {
                console.log(err)
                reject(err)
            })
        });
    }
    /**
     * Delete Product by id query
     * @staticmethod
     * @param  {string} userId - Request object
     * @param  {string} ProductId - Request object
     * @return {string} res
     */
    static deleteProductByIdQuery(userId, ProductId) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM Products WHERE created_by_user_id = '${userId}' AND id = '${ProductId}'`;
            db.query(query)
                .then(result => {
                    if (result.rowCount === 0) {
                        // console.log("Del " + result);
                        err.responseMessage = "No Product with id";
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
                    err.responseMessage = "Error fetching Product";
                    err.responseCode = "02";
                    reject(err);
                });
        });
    }
}

export default ProductQueries;
