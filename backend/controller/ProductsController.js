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
    totalPrice,
    image,
    category,
    addedBy
  } = req.body;

  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.status(200).json({ message: "Product Added",result:result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


export const deleteProduct=async(req,res)=>{
  try{
    const {token}=req.params;
    console.log(token)
    const result=await Product.findByIdAndDelete(token);
    if(!result){
      res.status(400).json({message:"Product not found"});
    }
    res.status(200).json({
      message:"Product Deleted",
      result:result
    });
  }catch(err){
    res.status(500).json({message:err.message});
  }
}