import StoreQuery from "../queries/StoreQueries";

/**
 * @exports
 * @class StoreService
 */
class StoreService {
    /**
     * Find user by name
     * @staticmethod
     * @param  {string} name - Request object
     * @return {string} res
     */
    static findStoreByName(id, name) {
        return new Promise((resolve, reject) => {
            StoreQuery
                .findStoreByNameQuery(id, name)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }

    /**
     * save new store
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static saveNewStore(body, id) {
        return new Promise((resolve, reject) => {
            StoreQuery
                .saveNewStoreQuery(body, id)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }
    /**
     * update store
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static updateStore(body, id, storeId) {
        return new Promise((resolve, reject) => {
            StoreQuery
                .updateStoreQuery(body, id, storeId)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }
    /**
     * Get store by id
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static findStoreById(userId, storeId) {
        return new Promise((resolve, reject) => {
            StoreQuery
                .findStoreByIdQuery(userId, storeId)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }
    /**
     * Get all user created store
     * @staticmethod
     * @param  {string} store - Request object
     * @return {string} res
     */
    static getAllStoresCreatedByUser(userId) {
        return new Promise((resolve, reject) => {
            StoreQuery
                .findAllStoresCreatedByUserQuery(userId)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }
    /**
     * Delete store by id
     * @staticmethod
     * @param  {string} store - Request object
     * @return {string} res
     */
    static deleteStoreById(userId, storeId) {
        return new Promise((resolve, reject) => {
            StoreQuery
                .deleteStoreByIdQuery(userId, storeId)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }
}

export default StoreService;
