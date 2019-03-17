import { Router } from "express";
import passport from "passport";
import user from "../../app/routes/user";
import store from "../../app/routes/store";
import product from "../../app/routes/product";
import StoreController from "../../app/controllers/StoreController";
import TokenMiddleware from "../../app/middlewares/token";
import ProductController from "../../app/controllers/ProductController";

const { findStoreByName } = StoreController;
const { getAllProductsCreatedByUser, getAllProductsInStore } = ProductController;
const { verifyToken } = TokenMiddleware;
const api = Router();

// api.use(cors())
api.get("/", (req, res) =>
    res.status(200).json({
        ok: true,
        message: "Welcome to OnePercentLab",
        status: "API version 1"
    })
);

api.use("/", user);
api.get('/:store', verifyToken, findStoreByName);
api.use("/store", store);
api.use("/product", product);
api.get('/:products', verifyToken, getAllProductsCreatedByUser)
api.get('/:products', verifyToken, getAllProductsInStore)
api.use(passport.initialize());
api.use(passport.session());
api.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

// No routes matched? 404.
api.use("*", (req, res) =>
    res.status(404).send({ message: "Sorry that route/method doesnt exist" })
);

export default api;
