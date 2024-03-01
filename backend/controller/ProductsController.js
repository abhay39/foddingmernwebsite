import Product from "../models/productsModel.js";

export const totalProductsList = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDishesWithCategory = async (req, res) => {
  const { category } = req.params;

  try {
    if (category == "All") {
      const products = await Product.find();
      res.status(200).json(products);
    } else {
      const products = await Product.find({ category: category });
      res.status(200).json(products);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDishesWithCategoryAndPrice = async (req, res) => {
  const { category } = req.params;
  const { price } = req.params;

  console.log(category, price);

  try {
    const sortOrder = price === '1' ? 1 : -1;

    if (category === 'All') {
      const products = await Product.find().sort({
        price: sortOrder
      });
      res.status(200).json(products);
    } else {
      const products = await Product.find({ category: category }).sort({
        price: sortOrder
      });
      res.status(200).json(products);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getDishesWithCategoryAndRating = async (req, res) => {
  const { category } = req.params;
  const { rating } = req.params;

  console.log(category, rating);

  try {
    const sortOrder = price === '1' ? 1 : -1;

    if (category === 'All') {
      const products = await Product.find().sort({
        rating: sortOrder
      });
      res.status(200).json(products);
    } else {
      const products = await Product.find({ category: category }).sort({
        rating: sortOrder
      });
      res.status(200).json(products);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    image,
    category,
    stock,
    rating,
    addedBy
  } = req.body;

  try {
    const product = new Product({
      name: name,
      description: description,
      price: price,
      image: image,
      category: category,
      stock: stock,
      rating: rating,
      addedBy: addedBy
    });
    const result = await product.save();
    res.status(200).json({ message: "Product Added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
