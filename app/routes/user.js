import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/UserController";
import UserMiddleware from "../middlewares/users";
import TokenMiddleware from "../middlewares/token";
const {
    createUser,
    loginUser,
    changePassword,
    getSecretToken,
    changePasswordByToken
} = UserController;

const {
    validateChangePassword,
    validateUserSignup,
    validateUserLogin,
    validateChangePasswordEmail
} = UserMiddleware;

const { verifyToken } = TokenMiddleware;

const router = Router();

router.post("/auth/signup", validateUserSignup, createUser);
router.post("/auth/login", validateUserLogin, loginUser);
router.post(
    "/auth/changepassword",
    validateChangePasswordEmail,
    verifyToken,
    changePassword
);
router.get("/auth/email/verify/:id", verifyToken, getSecretToken);
router.post(
    "/auth/email/changepassword",
    validateChangePassword,
    verifyToken,
    changePasswordByToken
);

// Google login
router.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile"]
    })
);

router.get(
    "/auth/google/redirect",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        console.log("success here");
        res.redirect("/");
    }
);

// Facebook login
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
    "/auth/facebook/redirect",
    passport.authenticate("facebook", {
        failureRedirect: "/api/v1",
        successRedirect: "/api/v1"
    })
);

export default router;
