const { Sequelize, Op, DataTypes } = require('sequelize');
const Product = require("../models/product");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, type, image } = req.body;
    if(name && price && type) {
      const newProduct = await Product.create({ name, price, description, type, image });
      res.status(201).json({ message: "Product created successfully", product: newProduct });
    } else {
      return res.status(401).json({ message: "Name, Price and Type is required." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Products Details With Pagination and Search
exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;
    
    // Construct query condition for search
    const whereCondition = {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ]
    };

    // Fetch products with pagination and search
    const products = await Product.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: offset
    });

    res.status(200).json({
      totalItems: products.count,
      totalPages: Math.ceil(products.count / limit),
      currentPage: parseInt(page),
      products: products.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Specific Product Details
exports.getSpecificProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, type, image } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.update({ name, price, description, type, image });
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
