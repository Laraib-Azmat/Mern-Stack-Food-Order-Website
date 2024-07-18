import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


//placing order from frontend
const placeOrder = async (req,res)=>{
try{
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:[]});
        res.json({success:true,message:"Order Done"})
}catch(error){

    console.log(error)
    res.json({success:false,message:"Error while comfirming order"})
}
}

//All orders for user
const userOrders = async (req,res)=>{
    try{

        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true, data:orders})

    }catch(error){
        console.log(error)
        res.json({success:false, message:"fail to fetch order"})
    }
}

//list all orders 

const listOrder = async (req,res)=>{
    try{
            const orders = await orderModel.find({});
            res.json({success:true,data:orders})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"fail to fetch order"})
    }
}

//update order status
const updateStatus = async (req, res)=>{

    try{
            await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
            res.json({success:true, message:"Order Status updated!"})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error while Updating status"})
    }
}

//delete order
const deleteOrder = async (req,res)=>{
    try{
        const orderId = req.body.orderId;
        await orderModel.findByIdAndDelete(orderId );
        res.json({success:true, message:"Order deleted!"})
}catch(error){
    console.log(error)
    res.json({success:false, message:"Error while deleting order"})
}
}



export {placeOrder, userOrders, listOrder, updateStatus,deleteOrder};