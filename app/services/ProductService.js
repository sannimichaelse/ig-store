import ProductQuery from "../queries/ProductQueries";

/**
 * @exports
 * @class ProductService
 */
class ProductService {
    /**
     * Find product by name
     * @staticmethod
     * @param  {string} name - Request object
     * @return {string} res
     */
    static findProductByName(id, name) {
        return new Promise((resolve, reject) => {
            ProductQuery
                .findProductByNameQuery(id, name)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }

    /**
     * save new Product
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static saveNewProduct(body, id) {
        return new Promise((resolve, reject) => {
            ProductQuery
                .saveProductQuery(body, id)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }
    /**
     * update Product
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static updateProduct(body, id, ProductId) {
        return new Promise((resolve, reject) => {
            ProductQuery
                .updateProductQuery(body, id, ProductId)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }
    /**
     * Get Product by id
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static findProductById(userId, ProductId) {
        return new Promise((resolve, reject) => {
            ProductQuery
                .findProductByIdQuery(userId, ProductId)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }
    /**
     * Get all user created Product
     * @staticmethod
     * @param  {string} Product - Request object
     * @return {string} res
     */
    static getAllProductsCreatedByUser(userId, pageNo) {
        return new Promise((resolve, reject) => {
            ProductQuery
                .findAllProductsCreatedByUserQuery(userId, pageNo)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }
    /**
    * Get all products in store
    * @staticmethod
    * @param  {string} Product - Request object
    * @return {string} res
    */
    static getAllProductsInStore(userId, pageNo, storeId) {
        return new Promise((resolve, reject) => {
            ProductQuery
                .findAllProductsInStoreQuery(userId, pageNo, storeId)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }
    /**
     * Delete Product by id
     * @staticmethod
     * @param  {string} Product - Request object
     * @return {string} res
     */
    static deleteProductById(userId, ProductId) {
        return new Promise((resolve, reject) => {
            ProductQuery
                .deleteProductByIdQuery(userId, ProductId)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }
}

export default ProductService;
