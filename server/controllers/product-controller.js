
const productService = require('../services/product-service');
class ProductController {

    async createProduct(req, res) {
        try {
            const productData = req.body;
            const product = await productService.createProduct(productData);
            res.status(201).json(product);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts();
            res.json(products);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
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
            res.status(500).json({ message: 'Internal server error' });
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
            res.status(500).json({ message: 'Internal server error' });
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
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new ProductController()
