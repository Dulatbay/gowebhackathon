const CartModel = require('../models/cart-model')
const ApiError = require("../exceptions/api-error");
class CartService{
    async addProductToCart(userId, productId){
        const cart = await CartModel.findOne({user: userId})
        if(!cart) throw ApiError.NotFound('Cart not found');
        cart.products.push(productId)
        await cart.save()
        return cart;
    }


    async removeProductFromCart(userId, productId){
        const cart = await CartModel.findOne({user: userId})
        if(!cart) throw ApiError.NotFound('Cart not found');
        const index = cart.products.indexOf(productId);
        if (index !== -1) {
            cart.likes.splice(index, 1);
            await cart.save();
        }
        return cart;
    }
}

module.exports = new CartService()