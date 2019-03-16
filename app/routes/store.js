import { Router } from "express";
import StoreController from "../controllers/StoreController";
import StoreMiddleware from "../middlewares/StoreMiddleware";
import TokenMiddleware from "../middlewares/token";

const {
    createNewStore,
    updateStore,
    findStoreById,
    getAllStoresCreatedByUser,
    deleteStoreById,
    findStoreByName
} = StoreController;

const { validateStoreFields } = StoreMiddleware;

const { verifyToken } = TokenMiddleware;

const router = Router();
//router.get('/:store', verifyToken, findStoreByName);
router.get("/all", verifyToken, getAllStoresCreatedByUser);
router.post("/", validateStoreFields, verifyToken, createNewStore);
router.put("/:id", validateStoreFields, verifyToken, updateStore);
router.get("/:id", verifyToken, findStoreById);
router.delete("/:id", verifyToken, deleteStoreById);


export default router;
