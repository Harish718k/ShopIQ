import express from "express";

import authRoutes from './routes/auth.route.js'
import productRoutes from './routes/product.route.js'
import orderRoutes from './routes/order.route.js'

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

import { Product } from "./models/product.model.js";
import cookieParser from "cookie-parser";
import errorMiddleware from './middleware/error.js'

const app = express()
const PORT = ENV_VARS.PORT

app.use(express.json())
app.use(cookieParser()) 

app.use("/api/v1",authRoutes)
app.use("/api/v1",productRoutes)
app.use("/api/v1",orderRoutes)

app.use(errorMiddleware)


app.listen(PORT, ()=>{
    console.log("server started at: "+PORT);
    connectDB();
})

//asHeyMa391JsJXKK