import bcrypt from "bcrypt";
import moment from "moment";
import randomstring from "randomstring";
import db from "../../config/connection/connect";

const saltRounds = 10;
const obj = {};
const err = {};

/**
 * @exports
 * @class UserQueries
 */
class UserQueries {
    /**
     * Find user by email
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */
    static findUserByEmailQuery(email) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM users WHERE email = '${email}'`;
            db.query(query)
                .then(result => {
                    if (result.rowCount === 0) {
                        err.responseMessage = "user does not exist";
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
                    err.responseMessage = "Error Finding User";
                    err.responseCode = "02";
                    reject(err);
                });
        });
    }
    /**
     * Find user by id
     * @staticmethod
     * @param  {string} id - Request object
     * @return {string} res
     */
    static findUserByIdQuery(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM users WHERE id = '${id}'`;
            db.query(query)
                .then(result => {
                    if (result.rowCount === 0) {
                        err.responseMessage = "user does not exist";
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
                    err.responseMessage = "Error Finding User";
                    err.responseCode = "02";
                    reject(err);
                });
        });
    }
    /**
     * save new user
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static saveUserQuery(body) {
        const {
            firstname,
            lastname,
            gender,
            date_of_birth,
            phone_number,
            image_url,
            password,
            oauth_type,
            oauth_id,
            state_code,
            city_code,
            fullname,
            country_code,
            address,
            email
        } = body;

        // Email, fullname and password

        const d = new Date();
        const active = false;
        const added_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
        const secretToken = randomstring.generate();
        const completed = "no";

        return new Promise((resolve, reject) => {
            this.findUserByEmailQuery(email)
                .then(err => {
                    reject(err);
                })
                .catch(res => {
                    bcrypt.hash(password, saltRounds).then(hash => {
                        const queryBody = `
                              INSERT INTO users(firstname, lastname, gender, date_of_birth, phone_number, image_url, password , oauth_type, oauth_id, state_code, city_code, country_code, address, email, added_at, updated_at, active, suspended_at, secret_token, completed, fullname)
                              VALUES ('${firstname || "null"}', '${lastname ||
                            "null"}', '${gender || "null"}', '${date_of_birth ||
                            "null"}','${phone_number || "null"}','${image_url ||
                            "null"}','${hash}', '${oauth_type ||
                            "null"}', '${oauth_id || "null"}', '${state_code ||
                            "null"}', '${city_code ||
                            "null"}','${country_code ||
                            "null"}', '${address || "null"}', '${email}','${added_at}', '${added_at}', '${active}', '${added_at}','${secretToken}','${completed}','${fullname}')`;
                        db.query(queryBody)
                            .then(result => {
                                if (result.rowCount >= 1) {
                                    resolve("Data Saved");
                                } else if (result.rowCount === 0) {
                                    console.log("got here", result);
                                    reject("Could Not Save User");
                                }
                            })
                            .catch(e => {
                                console.log("e", e);
                                reject("Error Saving New User");
                            });
                    });
                });
        });
    }
    /**
     * verify token
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static verifySecretTokenQuery(token) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM users WHERE secret_token = '${token}'`;
            db.query(query)
                .then(result => {
                    if (result.rowCount === 0) {
                        err.data = "user does not exist";
                        err.responseCode = "01";
                        reject(err);
                    } else if (result.rowCount >= 1) {
                        obj.rowCount = result.rowCount;
                        obj.rows = result.rows;
                        resolve(obj);
                    }
                })
                .catch(e => {
                    err.rowCount = 0;
                    err.rows = [];
                    reject(err);
                });
        });
    }
    /**
     * update password
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static updatePasswordByTokenQuery(newpassword, token) {
        //console.log(newpassword, token);

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
}

export default UserQueries;
