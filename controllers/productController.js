const productModel = require("../models/product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const getProductInfo = (body) => {
  const { name, description, price, category, image, stock } = body;
  return [name, description, price, category, image, stock];
};

// --------------------------------------------------------------//
// --------------------------------------------------------------//

const createProduct = async (req, res) => {
  const result =getProductInfo(req.body);
  if (!Array.isArray(result)) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const [name, description, price, category, image, stock] = result;
  try {
    const createProducts = await productModel.createProduct(
      name,
      description,
      price,
      category,
      image,
      stock
    );
  res.json(createProducts).status(200);
} catch (err) {
    console.error({err : "server failed"}, {status: 500})
}};

// --------------------------------------------------------------//
// --------------------------------------------------------------//

const searchProduct = async (req , res)=>{
  const result =getProductInfo(req.body);
  if (!Array.isArray(result)) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const name = result[0]
  console.log(name)
  try{
    const searchproduct = await productModel.searchProduct(name)
    if(!searchproduct)
      return res.json("no product have the name like u provided").status(401)
    return res.json(searchproduct)
  }catch(err){
    console.error({err: "server not working"},{status: 500}); 
  }  
};

// --------------------------------------------------------------//
// --------------------------------------------------------------//


const updateProduct = async (req , res)=>{
  const result =getProductInfo(req.body);
  if (!Array.isArray(result)) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const name = result[0]
  console.log(name)
  try{
    const searchproduct = await productModel.searchProduct(name)
    if(!searchproduct)
      return res.json("no product have the name like u provided").status(401)
    return res.json(searchproduct)
  }catch(err){
    console.error({err: "server not working"},{status: 500}); 
  } 

};

// ---------------------------------------------------------------//
// ---------------------------------------------------------------//


const deleteProduct = async (req , res)=>{
  const result =getProductInfo(req.body);
  if (!Array.isArray(result)) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const name = result[0]
  console.log(name)
  try{
    const searchproduct = await productModel.searchProduct(name)
    if(!searchproduct)
      return res.json("no product have the name like u provided").status(401)
    return res.json(searchproduct)
  }catch(err){
    console.error({err: "server not working"},{status: 500}); 
  } 
};

// -----------------------------------------------------------------//
// -----------------------------------------------------------------//


const allProducts = async (req , res)=>{
 const result = await productModel.getAllProduct()
 res.json(result).status(200)
}
// -----------------------------------------------------------------//
// -----------------------------------------------------------------//


module.exports = { createProduct, allProducts, searchProduct, updateProduct, deleteProduct };
