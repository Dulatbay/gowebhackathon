const ProductModel = require('../models/product-model')

class ProductService {
    async createProduct(productData) {
        const product = await ProductModel.create(productData);
        return product;
    }

    async getAllProducts() {
        const products = await ProductModel.find({});
        return products;
    }

    async getProductById(productId) {
        const product = await ProductModel.findById(productId);
        return product;
    }

    async updateProduct(productId, productData) {
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, productData, { new: true });
        return updatedProduct;
    }

    async deleteProduct(productId) {
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        return deletedProduct;
    }
}

module.exports = new ProductService()