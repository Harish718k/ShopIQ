import { Order } from "../models/oder.model.js";
import { Product } from "../models/product.model.js";

export async function newOrder(req,res){
    const {
        shippingInfo, 
        orderItems, 
        itemsPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        shippingInfo, 
        orderItems, 
        itemsPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user: req.user._id
    })

    res.status(201).json({
        success:true,
        order
    })
}

export async function getSingleOrder(req,res) {
    const order = await Order.findById(req.params.id).populate('user','firstname lastname email')
    if(!order){
        return res.status(404).json({success:false, message:"Order not found"})
    }

    res.status(200).json({success:true, order})
}

export async function myOrders(req,res){
    const orders = await Order.find({user: req.user._id});

    res.status(200).json({success:true, count:orders.length, orders})
}

//Admin

export async function orders(req,res){
    const orders = await Order.find().populate('user', 'firstname lastname email');
    res.status(200).json({success:true, count:orders.length, orders})
}

export async function updateOrderStatus(req,res){
    const order = await Order.findById(req.params.id);

    if(order.orderStatus == 'Delivered'){
        return res.status(400).json({success:false, message:"Order delivered!"})
    }

    order.orderItems.forEach(async orderItem => {
        await updateStock(orderItem.product, orderItem.quantity)
    });

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now()
    await order.save()

    res.status(200).json({success:true, message:"Order status updated"})
}

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({validateBeforeSave:false})
}

export async function deleteOrder(req,res){
    const order = await Order.findByIdAndDelete(req.params.id)
    if(!order){
        res.status(404).json({success:false, message:"Order not found"})
    }
    res.status(200).json({success:true, message:"Order deleted."})
}