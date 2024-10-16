import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import {User} from "../models/userSchema.js";
import { genrateToken } from "../utils/jwtToken.js"
import cloudinary from "cloudinary";


export const patientRegister =catchAsyncErrors(async(req,res,next)=>{
    const {firstname,lastname,email,phone,password,gender,dob,nic,role}= req.body;

    if( ! firstname|| !lastname|| !email|| !phone|| !password|| !gender|| !dob|| !nic|| !role

    ){
        return next(new ErrorHandler("Please Fill required details", 400));
    }

    let user =await User.findOne({email});

    if(user){
        return next(new ErrorHandler("User Already Registerd !",400));

    }
    user = await User.create({
        firstname,lastname,email,phone,password,gender,dob,nic,role,});


        //genrated the token
        genrateToken(user,"user Registered !",200,res);
    // res.status(200).json({
    //     success: true,
    //     message: "user Registered !",
    // });



    
})


export const login = catchAsyncErrors(async(req,res,next) =>{
 const {email,password,confirmPassword,role}=req.body;


 if(!email || !password || !confirmPassword || !role){
    return next(new ErrorHandler("Please Fill Required Deatils !!", 400))
 }
 if(password !== confirmPassword){
    return next(new ErrorHandler("Password and ConfirmPassword are not matched !!",400));
}
const user =await User.findOne({email}).select("+password");

if(!user){
    return next(new ErrorHandler("Invalid Password or Email",400));
}

const isPasswordMatched =await user.comparePassword(password);

if(!isPasswordMatched){
    return next(new ErrorHandler("Invalid Password Or Email",400));
}

if (role !== user.role) {
    return next(new ErrorHandler(`User Not Found With This Role!`, 400));
  }

//jwt token is replacebale of login status/ register status
  genrateToken(user,"Boom! User Logged In.",200,res);


// res.status(200).json({
//     success: true,
//     message: "Boom! User Logged In.",
// })

});

export const addNewAdmin = catchAsyncErrors(async(req,res,next)=>{
    const {firstname,lastname,email,phone,password,gender,dob,nic}= req.body;
    if( ! firstname|| !lastname|| !email|| !phone|| !password|| !gender|| !dob|| !nic

    ){
        return next(new ErrorHandler("Please Fill required details", 400));
    }
    const isRegistered = await User.findOne({email});

if(isRegistered){
    return next(new ErrorHandler(`${isRegistered.role} with this Email Already Exists!`));
}
const admin= await User.create({
    firstname,lastname,email,phone,password,gender,dob,nic,role: "Admin",
});

res.status(200).json({
    success: true,
    message:"yeah! New Admin Registered !",
    admin,
})

})

//creating fuction for doctors

export const getAllDoctors = catchAsyncErrors(async (req,res,next)=>{
    const doctor = await User.find({ role : "Doctor"});
    res.status(200).json({
        success: true,
        doctor,
    });
});


//this function is depends on the authcation file , auth.js
export const getUserDetails =catchAsyncErrors(async(req,res,next)=>{

const user = req.user;
res.status(200).json({
    success:true,
    user,
})

})

//logout the admin
export const logoutAdmin =catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("adminToken","",
        {
        httpOnly: true,
        expires: new Date(Date.now()),
    }


    ).json({
        success :true,
        message : "Admin Logout Successfully!"
    })
})

//logout for patients

export const logoutPatient = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("patientToken","" ,{
        httpOnly: true,
        expires: new Date(Date.now()),

    }).json({
        success: true,
        message : "Patient Logout Successfully!"
    });
})

//add new doctor

export const addnewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar required!", 400));
    }

    // Accepting and validating file format
    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

    // Corrected 'mimetype' instead of 'mintype'
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File format not supported!", 400));
    }
//role variable is removed
const {firstname,lastname,email,phone,password,gender,dob,nic,doctorDepartment}=req.body;

if(!firstname||
    !lastname||
   !email||
    !phone||
    !password||
    !gender||
    !dob||
    !nic||
    // !role||
    !doctorDepartment
){
    return  next(new ErrorHandler("Please fill Required Doctor Details!",400));
    
}

const isRegistered =await User.findOne({email});

if(isRegistered){
    return  next(new ErrorHandler(`${isRegistered} already registered with this email!`,400));
}

//storing the cloudnary photo response 
const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
);

//getting cloudnary error then print it
if(!cloudinaryResponse || cloudinaryResponse.error){
console.error("Cloudinary Error:",
  cloudinaryResponse.error || "Unknown cloudinary Error"  
);
}
//creating doctor deatils and role is commented.
const doctor = await User.create({
    firstname,
    lastname,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    // role,
    doctorDepartment,
    role : "Doctor",
    docAvatar:{
public_id: cloudinaryResponse.public_id,
url: cloudinaryResponse.secure_url,

    },
});
res.status(200).json({
    success: true,
    message: "New Doctor Registered! ",
    doctor
});



})