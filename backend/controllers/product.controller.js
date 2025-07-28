import { ENV_VARS } from "../config/envVars.js";
import { Product } from "../models/product.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { APIFeatures } from "../utils/apiFeatures.js";

export async function getProducts (req,res){
    try{
        const productPerPage = 20
        const apiFeatures = new APIFeatures(Product.find(), req.query).search().paginate(productPerPage)
        const products = await apiFeatures.query;
        if(products.length==0){
            return res.status(404).json({success:false, message:"Product not found"})
        }
        res.json({success: true,count: products.length ,products})
    } catch(error){
        console.log("Error in product controller: "+error.message);
        res.status(500).json({success:false, message:"server error"})
    }
}


export const newProduct = catchAsyncError(async (req,res)=>{
    const product = await Product.create(req.body);
    res.status(201).json({success:true, product})
    
})

export async function getSingleProduct(req,res,next){
    try {
        
    const product = await Product.findById(req.params.id);

    if(!product){
       return next(new ErrorHandler("Product not found", 400)) 
    }

    res.status(200).json({success:true, product})
    } catch (error) {
        console.log("Error in get single product: "+error.message);
        res.status(500).json({success:false, message:"server error"})
    }
}

export async function updateProduct(req,res){
    try {
        let product = await Product.findById(req.params.id)

        if(!product){
        return res.status(404).json({success:false, message:"Product not found"}) 
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new:true, 
            runValidators:true
        })

        res.status(200).json({success:true, product})
    } catch (error) {
        console.log("Error in update product: "+error.message);
        res.status(500).json({success:false, message:"server error"})
    }
}

export async function deleteProduct(req,res){
    try {
        
    const product = await Product.findByIdAndDelete(req.params.id);

    if(!product){
       return res.status(404).json({success:false, message:"Product not found"}) 
    }

    res.status(200).json({success:true, message:"Product deleted"})
    } catch (error) {
        console.log("Error in get single product: "+error.message);
        res.status(500).json({success:false, message:"server error"})
    }
}