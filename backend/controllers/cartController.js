import userModel from "../models/userModel.js";


//add to cart
const addToCart = async (req, res)=>{
    try{
            let userData = await userModel.findOne({_id:req.body.userId});
            let cartData = userData.cartData;
            let updatedItems;

            const addItemIndex = cartData.findIndex(
                (item) => item.id === req.body.id
              );
          
            const addExistingItem = cartData[addItemIndex];
            if (addExistingItem) {
                const updatedItem = {
                  ...addExistingItem,
                  amount: addExistingItem.amount + req.body.amount,
                };
                updatedItems = [...cartData];
                updatedItems[addItemIndex] = updatedItem;
              } else {
                updatedItems = cartData.concat(req.body);
              }

            await userModel.findByIdAndUpdate(req.body.userId,{cartData:updatedItems})

            res.json({success:true,message:"Added to cart!"});

    }catch(error){
        console.log(error)
        res.json({success:true,message:"Fail to add cart!"});
    }
}

//remove from cart
const removeFromCart = async (req,res)=>{

  try{

    let userData = await userModel.findOne({_id:req.body.userId});
    let cartData = userData.cartData

    let updatedItems;
    const exixtingItemIndex = cartData.findIndex(
    (item) => item.id === req.body.id
);
    const existingItem = cartData[exixtingItemIndex];


    if (existingItem.amount === 1) {
    updatedItems = cartData.filter((item) => item.id !== req.body.id);
    } else {
    const updatedItem = 
    { ...existingItem, amount: existingItem.amount - 1 };
    updatedItems = [...cartData];
    updatedItems[exixtingItemIndex] = updatedItem;
}
    await userModel.findByIdAndUpdate(req.body.userId,{cartData:updatedItems})

    res.json({success:true,message:"Item deleted"});

  }catch(error){
    console.log(error);
    res.json({success:false, message:"Something went wrong"})
  }
}

//fetch cart
const listCart = async(req,res)=>{
        try{
            let userData = await userModel.findById(req.body.userId);
            let cartData = await userData.cartData;
            res.json({success:true,cartData});
        }catch(error){
                console.log(error)
                req.json({success:false, message:"Fail to fetch cart"});
        }
}

export {addToCart, removeFromCart, listCart}