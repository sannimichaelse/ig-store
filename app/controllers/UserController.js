import UserService from "../services/UserService";
import passport from "passport";
/**
 * @exports
 * @class userController
 */
class UserControllerClass {
    /**
     * Creates a new user
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static createUser(req, res) {
        const { firstname } = req.body;
        // console.log(firstname);
        UserService.saveUser(req.body)
            .then(result => {
                // console.log(result);
                return res.status(201).json({
                    responseMessage: "New user created successfully"
                });
            })
            .catch(err => {
                console.log(err);
                if (err.rows[0].email) {
                    return res.status(400).json({
                        responseMessage: `User with this email ${
                            err.rows[0].email
                            } exists already`
                    });
                } else {
                    return res.status(400).json({
                        responseMessage: "Could not save user"
                    });
                }
            });
    }

    static updateSignup(req, res) {
        const { firstname } = req.body;
        const { data } = req.decoded;
        console.log(firstname, data);
        UserService.updateSignup(req.body, data)
            .then(result => {
                // console.log(result);
                return res.status(200).json({
                    responseMessage: "User details updated successfully"
                });
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({
                    responseMessage: "Could not save user"
                });
            });
    }

    static googleRedirect(req, res) {
        passport.authenticate("google");
    }

    static facebookRedirect(req, res) {
        passport.authenticate("facebook", {
            failureRedirect: "/api/v1",
            successRedirect: "/api/v1"
        });
    }

    static changePassword(req, res) {
        const { email } = req.body;

        const host = req.headers.host;

        UserService.sendChangePasswordMail(email, host)
            .then(response => {
                return res.status(200).json({
                    responseMessage: "Please Check Mail to Change Password"
                });
            })
            .catch(err => {
                // console.log("hi " + err);
                return res.status(400).json(err);
            });
    }

    static getSecretToken(req, res) {
        const token = req.params.id;

        // console.log(token);

        UserService.verifySecretToken(token)
            .then(response => {
                return res.status(200).json({
                    responseMessage:
                        "Token Verification Successful, Please Change Password"
                });
            })
            .catch(err => {
                return res.status(400).json({
                    responseMessage: "Token Verification Failed"
                });
            });
    }

    static changePasswordByToken(req, res) {
        // console.log("Loggedin UserID - " + req.decoded.data);

        const { newpassword, token } = req.body;

        UserService.updatePasswordByToken(newpassword, token)
            .then(response => {
                return res.status(200).json({
                    responseMessage: "Password Updated Successfully"
                });
            })
            .catch(err => {
                // console.log(err);
                return res.status(400).json({
                    responseMessage: "There Was an Error Changing Password"
                });
            });
    }

    static loginUser(req, res) {
        const { email, password } = req.body;

        UserService.validateUserLogin(email, password)
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(err => {
                return res.status(400).json({
                    responseMessage: err
                });
            });
    }
}

export default UserControllerClass;
