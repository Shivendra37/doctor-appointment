const cloudinary = require("cloudinary").v2;
const Product = require("../model/product_model");


// Create Product
const createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const { image } = req.files;

  if (!name || !description || !price || !image) {
    return res.json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    const uploadedImage = await cloudinary.uploader.upload(image.path, {
      folder: "products",
      crop: "scale",
    });

    const newProduct = new Product({
      name,
      description,
      image: uploadedImage.secure_url,
      price,
    });

    await newProduct.save();

    res.json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.json({
      success: true,
      message: "All products fetched successfully!",
      products: allProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Single Product
const getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const singleProduct = await Product.findById(productId);
    res.json({
      success: true,
      message: "Product fetched successfully",
      product: singleProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const { image } = req.files;

  if (!name || !description || !price) {
    return res.json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    let updatedData = {
      name,
      description,
      price,
    };

    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image.path, {
        folder: "products",
        crop: "scale",
      });
      updatedData.image = uploadedImage.secure_url;
    }

    const productId = req.params.id;
    await Product.findByIdAndUpdate(productId, updatedData);

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  const productId = req.params.id; // Make sure this matches the route definition

  try {
    await Product.findByIdAndDelete(productId);
    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
