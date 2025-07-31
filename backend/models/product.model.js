import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, "Please enter product name"],
        trim:true,
        maxLength: 100
    },
    price: {
        type:Number,
        min:0,
        required:[true,"Please enter product price"]
    },
    description: {
        type: String,
        required: [true,"Please enter product description"]
    },
    image:{
        type: String,
        required: [true,"Please enter product image path"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter product stock"]
    },
    },
    {
    timestamps: true 
  }
);

export const Product = mongoose.model('Product', productSchema);