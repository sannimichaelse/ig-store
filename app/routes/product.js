import { Router } from "express";
import ProductMiddleware from "../middlewares/ProductMiddleware";
import TokenMiddleware from "../middlewares/token";
import ProductController from "../controllers/ProductController";

const { createNewProduct, findProductById, getAllProductsCreatedByUser, deleteProductById, updateProduct } = ProductController;
const { validateProductPayload } = ProductMiddleware;
const { verifyToken } = TokenMiddleware;

const router = Router();

router.post("/", validateProductPayload, verifyToken, createNewProduct);
router.put("/:id", validateProductPayload, verifyToken, updateProduct);
router.get("/:id", verifyToken, findProductById);
router.get('/', verifyToken, getAllProductsCreatedByUser)
router.delete("/:id", verifyToken, deleteProductById);


export default router;
