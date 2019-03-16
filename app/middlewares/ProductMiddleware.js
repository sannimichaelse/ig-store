import Joi from "joi";
import { productSchema } from "../models/validation";
/**
 *
 * @exports
 * @class UserMiddleware
 */
class UserMiddleware {
    /**
     * UserMiddleware
     * @staticmethod
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @param {function} next - middleware next (for error handling)
     * @return {json} res.json
     */
    static validateProductPayload(req, res, next) {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                statusMessage: "Products Parameters cannot be empty"
            });
        }
        Joi.validate(req.body, productSchema)
            .then(value => next())
            .catch(err => {
                return res.status(400).json({
                    statusMessage: err.details[0].message.replace(/[\"]/gi, "")
                });
            });
    }
}

export default UserMiddleware;
