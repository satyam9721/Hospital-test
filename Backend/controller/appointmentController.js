import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstname,
    doctor_lastname,
    hasVisted,
    address,
  } = req.body;

  // !hasVisted||
  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !gender ||
    !nic ||
    !dob ||
    !appointment_date ||
    !department ||
    !doctor_firstname ||
    !doctor_lastname ||
    !address
  ) {
    return next(new ErrorHandler("Please fill full form !!", 400));
  }

  const isConflict = await User.find({
    firstname: doctor_firstname,
    lastname: doctor_lastname,
    role: "Doctor",
    doctorDepartment: department,
  });
  //if doctor not found
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not found", 404));
  }
  //if multiple doctor found with same deatails then differiate

  if (!isConflict.length > 0) {
    return next(
      new ErrorHandler(
        "Doctor conflict! Please Contact through email or phone",
        404
      )
    );
  }

  const doctorId = isConflict[0]._id;
  const patientsId = req.user._id;
  const appointment = await Appointment.create({
    firstname,
    lastname,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstname: doctor_firstname,
      lastname: doctor_lastname,
    },
    doctor_firstname,
    doctor_lastname,
    hasVisted,
    address,
    doctorId,
    patientsId,
  });

  res.status(200).json({
    success: true,
    message: "Appointment Sent Succesfully!",
    appointment,
  });
});







//to get all appointment when admin is authencated
export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});

// export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
//   // Ensure only admin can access this route
//   if (req.user.role !== "Admin") {
//     return next(new ErrorHandler("Oops! Admin Not Authenticated!!", 403));
//   }

//   // Fetch all appointments, optionally populate doctor and patient details
//   const appointments = await Appointment.find()
//     .populate("doctorId", "firstname lastname")
//     .populate("patientsId", "firstname lastname");

//   res.status(200).json({
//     success: true,
//     appointments,
//   });
// });












//to update the previous appointment
export const updateAppointmentStatus = catchAsyncErrors(
  async (req, res, next) => {
    //user/login:id for this we use params
    const { id } = req.params;
    let appointment = await Appointment.findById(id);

    if (!appointment) {
      return next(new ErrorHandler("Appointment Not found", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      userFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "Appointment Status Updated successfully !",
      appointment,
    });
  }
);


//deleted the appointments
export const deleteAppointment = catchAsyncErrors(async(req,res,next)=>{
const {id} =req.params;
let appointment = await Appointment.findById(id);

if(!appointment){
    return next(new ErrorHandler("Appointment not found",404));

}
await appointment.deleteOne();
res.status(200).json({
    success: true,
    message: "Appointment Deleted successfully",
})
})

