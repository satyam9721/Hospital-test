import { Message } from "../models/messageSchema.js"

//help from server down,addedd middleware
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler  from "../middlewares/error.js";



//message controller without catchAsyncErrors middleware
export const sendMessage= catchAsyncErrors(async (req,res,next) =>{
    const {firstname,lastname,email,phone,message}=req.body;

    if(!firstname|| !lastname|| !email|| !phone|| !message){
        return next(new ErrorHandler("Please Enter required Information!",400) );
        
    }
        await Message.create({firstname,lastname,email,phone,message});
        res.status(200).json({
            success:true,
            message: "Message Send Successfully!"
        });

    
});


//to get Allmessages, this methods only work when patients and admin login
export const getAllmessages = catchAsyncErrors(async(req,res,next)=>{
const messages = await Message.find();
res.status(200).json({
    success:true,
    messages,
})
})




