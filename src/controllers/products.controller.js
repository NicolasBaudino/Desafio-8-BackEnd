// getDataControllers, postDataControllers, updateDataControllers, deleteDataControllers
import { findProducts, findProductById, createProducts, updateProducts, deleteProducts } from "../services/products.services.js";

export const getProductsController = async (req, res) => {
    const { limit, page, sort, query } = req.query;
  
    const productData = await findProducts(limit, page, sort, query);
  
    res.status(200).json({ productData });
};

export const getProductByIdController = async (req, res) => {
    const { pid } = req.params;
  
    try {
      const productFind = await findProductById(pid);
      res.status(200).json({ productSelected: productFind });
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
};

export const addProductController = async (req, res) => {
    const product = req.body;
  
    try {
      const productCreated = await createProducts(product);
      res.status(201).json({
        message: "Product succesfully created",
        productCreated: productCreated,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

export const updateProductController = async (req, res) => {
    const { pid } = req.params;
    const productReq = req.body;
  
    try {
      const updateProductResult = await updateProducts(pid, productReq);
      res.status(200).json({ 
        message: "Product has modified", 
        productModified: updateProductResult
      });
    } catch (e) {
      res.status(500).json({
        error: e.message,
      });
    }
};

export const deleteProductController = async (req, res) => {
    const { pid } = req.params;
  
    try {
      await deleteProducts(pid);
      res.status(200).json({
        message: "Content successfully deleted!",
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
};