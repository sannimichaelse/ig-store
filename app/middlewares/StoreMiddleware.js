import Joi from "joi";
import { storeSchema } from "../models/validation";
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
    static validateStoreFields(req, res, next) {
        Joi.validate(req.body, storeSchema)
            .then(value => next())
            .catch(err => {
                return res.status(400).json({
                    responseCode: "01",
                    responseMessage: err.details[0].message.replace(/[\"]/gi, '')
                });
            });
    }
}

export default UserMiddleware;
