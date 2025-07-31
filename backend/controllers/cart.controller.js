// import axios from "axios"
// import { User } from "../models/user.model.js";



// export async function mergeCart(req, res){
    //     const {localCart} = req.body;
    
//     const userId = req.user.id
//     try {
//         const user = await User.findById(userId)
//         if (!Array.isArray(localCart)) {
//             return res.status(400).json({ success: false, message: "localCart must be an array" });
//         }
//         for (const item of localCart){
//             const index = user.cart.findIndex(
//                 (cartItem)=>cartItem.product.toString() === item.product._id
//             )

//             if(index !== -1){
//                 user.cart[index].quantity += item.quantity
//             } else{
//                 user.cart.push({product: item.product, quantity:item.quantity})
//             }
//         }

//         await user.save();
//         res.status(200).json({success: true, message: "Cart merged", cart:user.cart})
//     } catch (error) {
//         console.log("Error in mergeCart: "+error.message);
//         res.status(500).json({success:false, message:"Server error"})
//     }
// }

// export async function addToCart(req, res){
//     const {product, quantity, stock} = req.body
//     const userId = req.user.id
//     try {
//         const user = await User.findById(userId)
//         const index = user.cart.findIndex(
//                 (cartItem)=>cartItem.product._id === product._id
//             )

//         if(index !== -1){
//             const existingQuantity = user.cart[index].quantity;
//             const newQuantity = existingQuantity + quantity;

//             user.cart[index].quantity = newQuantity > stock ? stock : newQuantity;
//         } else{
//             const safeQuantity = quantity > stock ? stock : quantity;
//             user.cart.push({product: {
//             _id: product._id,
//             name: product.name,
//             price: product.price,
//             image: product.image,
//             stock: product.stock,
//             description: product.description
//         }, quantity:safeQuantity})
//         }
//         await user.save({validateBeforeSave:false});
//         res.status(200).json({success: true, message: "Product added",cart:user.cart})
//     } catch(error){
//         console.log("Error in add to Cart controller: "+error.message);
//         res.status(500).json({success: false, message: "server error"})

//     }
// }

// export async function updateCart(req, res){
//     const {user} = req.user
    
// }


// new 

// import Product from "../models/product.model.js";

import { Product } from "../models/product.model.js";


export const getCartProducts = async (req, res) => {
	try {
		const products = await Product.find({ _id: { $in: req.user.cartItems } });

		// add quantity for each product
		const cartItems = products.map((product) => {
			const item = req.user.cartItems.find((cartItem) => cartItem.id === product.id);
			return { ...product.toJSON(), quantity: item.quantity };
		});

		res.json(cartItems);
	} catch (error) {
		console.log("Error in getCartProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const addToCart = async (req, res) => {
	try {
		const { productId } = req.body;
		const user = req.user;

		const existingItem = user.cartItems.find((item) => item.id === productId);
		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			user.cartItems.push(productId);
		}

		await user.save();
		res.json(user.cartItems);
	} catch (error) {
		console.log("Error in addToCart controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const removeAllFromCart = async (req, res) => {
	try {
		const { productId } = req.body;
		const user = req.user;
		if (!productId) {
			user.cartItems = [];
		} else {
			user.cartItems = user.cartItems.filter((item) => item.id !== productId);
		}
		await user.save();
		res.json(user.cartItems);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const updateQuantity = async (req, res) => {
	try {
		const { id: productId } = req.params;
		const { quantity } = req.body;
		const user = req.user;
		const existingItem = user.cartItems.find((item) => item.id === productId);

		if (existingItem) {
			if (quantity === 0) {
				user.cartItems = user.cartItems.filter((item) => item.id !== productId);
				await user.save();
				return res.json(user.cartItems);
			}

			existingItem.quantity = quantity;
			await user.save();
			res.json(user.cartItems);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		console.log("Error in updateQuantity controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};