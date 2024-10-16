import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

//In whole below code authcation & authorization will be happen.



// Authenticating the admin
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHandler("Oops! Admin Not Authenticated!!", 400));
    }
    // If token is found, then verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Admin") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource`, 403));
    }
    next();
});

//Authenticating the patients
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
        return next(new ErrorHandler("Oops! Patient Not Authenticated!!", 400));
    }
    // If token is found, then verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this`, 403));
    }
    next();
});


//new line addes
export const isAuthorized =(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(
                    `${req.user.role} not allowed to access this resource!`
                )
            )
        }
        next(); 
    }
}


























// //this file created that to authenticate that admin
// import { User } from "../models/userSchema.js";
// import { catchAsyncErrors } from "./catchAsyncErrors.js";
// import ErrorHandler from "./error.js";
// import jwt from "jsonwebtoken";

// //authcating the admin
// export const isAdminAuthenticated = catchAsyncErrors(async(req,res,next)=>{
//     const token = req.cookies.adminToken;
//     if(!token){
//         return next(new ErrorHandler("Opps! Admin Not Authencatied !!" ,400));

//     }//if token is found the verify
//     const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY);
//     req.user = await UserfindById(decoded.id);
// if(req.user.role!== "Admin"){
//     return next(new ErrorHandler(` ${req.user.role} not authorized for this resource`,403));
// }
// next();

// });


// //authcating the patients
// export const isPatientAuthenticated = catchAsyncErrors(async(req,res,next)=>{
//     const token = req.cookies.patientToken;
//     if(!token){
//         return next(new ErrorHandler("Opps! patient Not Authencatied !!" ,400));

//     }//if token is found the verify
//     const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY);
//     req.user = await UserfindById(decoded.id);
// if(req.user.role!== "Patient"){
//     return next(new ErrorHandler(` ${req.user.role} not authorized for this`,403));
// }
// next();

// });

