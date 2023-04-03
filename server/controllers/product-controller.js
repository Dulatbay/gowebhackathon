
const productService = require('../services/product-service');
const fileService = require("../services/file-service");
class ProductController {

    async createProduct(req, res) {
        try {
            const images = req.files?.images;
            const arrPathImages = await fileService.getImages(images);

            const productData = {...req.body, images: arrPathImages};
            res.status(201).json(productData);
        } catch (err) {
            console.error(err);
        }
    }

    async getAllProducts(req, res) {
        try {
            const sort = req.params.sort || '-createdAt'
            const products = await productService.getAllProducts(req);
            res.json(products);
        } catch (err) {
            console.error(err);
        }
    }

    async getProductById(req, res) {
        try {
            const productId = req.params.id;
            const product = await productService.getProductById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (err) {
            console.error(err);
        }
    }

    async updateProduct(req, res) {
        try {
            const productId = req.params.id;
            const productData = req.body;
            const updatedProduct = await productService.updateProduct(productId, productData);
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(updatedProduct);
        } catch (err) {
            console.error(err);
        }
    }

    async deleteProduct(req, res) {
        try {
            const productId = req.params.id;
            const deletedProduct = await productService.deleteProduct(productId);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(deletedProduct);
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = new ProductController()
