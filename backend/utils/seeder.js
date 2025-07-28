import { connectDB } from '../config/db.js';
import products from '../data/product.json' assert { type: 'json' };
import { Product } from '../models/product.model.js'


connectDB();

const seedProduct = async ()=>{
    try {
        await Product.deleteMany()
        await Product.insertMany(products)
        console.log('All products added');
        
    } catch (error) {
        console.log(error.message);
    }
    process.exit();
}

seedProduct();