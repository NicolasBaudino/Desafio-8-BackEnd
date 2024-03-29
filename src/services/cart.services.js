import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

export async function findCarts() {
    return await cartModel.find();
}

export async function createCart(cart) {
    return await cartModel.create(cart);
}

export async function getCartById(id) {
    return await cartModel.findById(id);
}

export async function updateCart(_id, cart) {
    return await cartModel.findByIdAndUpdate({ _id }, cart);
}

export async function deleteCart(_id) {
    return await cartModel.findByIdAndDelete({ _id });
}

export async function getProductsFromCart(id){
    return await cartModel.findById(id).populate('products.product').lean();
}

export async function addProductCart (cartId, productId) {
    try {
        const cart = await cartModel.findById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        const product = await productModel.findById(productId);
        if (!product) {
            throw new Error('Producto no encontrado');
        }

        const existingProduct = cart.products.find(p => p._id.equals(productId));

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({
                _id: productId,
                quantity: 1
            });
        }

        await cart.save();

        return 'Se añadió el producto al carrito';
    } catch (error) {
        throw error;
    }
};

export async function updateProductQuantity(cartId, productId, newQuantity) {
    try {
      const cart = await cartModel.findById(cartId);
  
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
  
      const product = cart.products.find(p => p._id.equals(productId));
  
      if (!product) {
        throw new Error('Producto no encontrado en el carrito');
      }
  
      product.quantity = newQuantity;
      await cart.save();
  
      return cart;
    } catch (error) {
      throw error;
    }
}

export async function deleteProductFromCart(cartId, productId) {
    try {
      const cart = await cartModel.findById(cartId);
  
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
  
      const initialProductCount = cart.products.length;
  
      cart.products = cart.products.filter(p => !p._id.equals(productId));
  
      if (cart.products.length === initialProductCount) {
        throw new Error('Producto no encontrado en el carrito');
      }
  
      await cart.save();
  
      return cart;
    } catch (error) {
      throw error;
    }
}

export async function updateCartWithProducts(cartId, newProducts) {
    try {
      const cart = await cartModel.findById(cartId);
  
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
  
      cart.products = [];
  
      newProducts.forEach(product => {
        cart.products.push({
          product: product.productId,
          quantity: product.quantity
        });
      });
  
      await cart.save();
  
      return cart;
    } catch (error) {
      throw error;
    }
}

export async function deleteAllProductsFromCart(cartId) {
    try {
      const cart = await cartModel.findById(cartId);
  
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
  
      cart.products = [];
      await cart.save();
  
      return cart;
    } catch (error) {
      throw error;
    }
}