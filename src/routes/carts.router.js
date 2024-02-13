import { Router } from "express";
import { getCartsController, createCartController, getCartByIdController, updateCartController, deleteCartByCartIdController, addProductByCartIdController, updateQuantityProductController, deleteProductByCartIdController} from "../controllers/cart.controller.js";

const router = Router();

router.get("/", getCartsController);

router.post("/", createCartController);

router.put("/:cid", updateCartController);

router.delete("/:cid", deleteCartByCartIdController);

router.post("/:cid/products/:pid", addProductByCartIdController);

router.put('/:cid/products/:pid', updateQuantityProductController);

router.delete("/:cid/products/:pid", deleteProductByCartIdController);

export default router;