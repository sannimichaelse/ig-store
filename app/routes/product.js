import { Router } from "express";
import ProductMiddleware from "../middlewares/ProductMiddleware";
import TokenMiddleware from "../middlewares/token";
import ProductController from "../controllers/ProductController";

const { createNewProduct, findProductById, getAllProductsCreatedByUser } = ProductController;
const { validateProductPayload } = ProductMiddleware;
const { verifyToken } = TokenMiddleware;

const router = Router();

router.post("/", validateProductPayload, verifyToken, createNewProduct);
// router.put("/:id", validateStoreFields, verifyToken, updateStore);
router.get("/:id", verifyToken, findProductById);

router.get('/', verifyToken, getAllProductsCreatedByUser)
// router.delete("/:id", verifyToken, deleteStoreById);


export default router;
