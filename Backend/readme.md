https://github.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application
deploy servre ec2 = https://www.youtube.com/watch?v=cgWXQqL-ZU8

start server> npm run dev
http://localhost:4000/api/v1/message/getall 

patients register

{ 

     "firstname": "Satyam",
    "lastname": "gupta",
    "email" : "patients@gmail.com",
    "phone" :1234567890,
    "password" : "12345678",
    "dob" : "11/03/2002",
    "nic": "123456",
    "gender":"Male",
    "role" : "Patient"
}


//user login

{
    "email" : "zsh@gmail.com",
    "password" : "12345678",
    "confirmPassword" : "12345678",
    "role" : "Patient"
}


login admin = http://localhost:4000/api/v1/user/login
{   
    "email" : "admin@gmail.com",
    "phone" :1234567890,
    "password" : "12345678",
    "confirmPassword": "12345678",
    "role" : "Admin"
}



admin json body

{   
    "email" : "admin@gmail.com",
    "phone" :1234567890,
    "password" : "12345678",
    "confirmPassword":  "12345678",
    "role" : "Admin"
}


{   "firstname": "Satyam",
    "lastname": "gupta",
    "email" : "admin@gmail.com",
    "phone" :1234567890,
    "password" : "12345678",
    "dob" : "11/03/2002",
    "nic": "123456",
    "gender":"Male",
    "role" : "Admin"
}

DOCTOR json Body 

{
    "success": true,
    "message": "New Doctor Registered! ",
    "doctor": {
        "firstname": "UMin",
        "lastname": "Han",
        "email": "DOCTOR@gmail.com",
        "phone": "1234567890",
        "nic": "123456",
        "dob": "1990-09-04T18:30:00.000Z",
        "gender": "Male",
        "password": "$2b$10$sZnNYryUrqtIxGk8WLwkE.TWVtjtBA5pkNtfBnMqaceZPhjIUV6vy",
        "role": "Doctor",
        "doctorDepartment": "Radiology",
        "docAvatar": {
            "public_id": "xa0utt0f8rwphdqn30ks",
            "url": "https://res.cloudinary.com/dzsgyqpap/image/upload/v1723294540/xa0utt0f8rwphdqn30ks.png"
        },
        "_id": "66b7634d45b6a4f6ea50bffa",
        "__v": 0
    }
}

//appointment registration
required input

{   "firstname": "Yashika",
    "lastname": "Devidigia",
    "email" : "zsh@gmail.com",
    "phone" :1234567890,
    "password" : "12345678",
    "dob" : "11/03/2002",
    "nic": "123456",
    "gender":"Male",
    "role" : "Patient",
    "appointment_date": "1234",
    "department":"Radiology",
    "doctor_firstname": "UMin",
    "doctor_lastname": "Han",
    "address": " Adress sat"
    
}

required output

{
    "success": true,
    "message": "Appointment Sent Succesfully!",
    "appointment": {
        "firstname": "Yashika",
        "lastname": "Devidigia",
        "email": "zsh@gmail.com",
        "phone": "1234567890",
        "nic": "123456",
        "dob": "2002-03-10T18:30:00.000Z",
        "gender": "Male",
        "appointment_date": "1234",
        "department": "Radiology",
        "doctor": {
            "firstname": "UMin",
            "lastname": "Han"
        },
        "hasVisted": false,
        "doctorId": "66b7634d45b6a4f6ea50bffa",
        "patientsId": "66af9096dba4b4fca249a9a4",
        "address": " Adress sat",
        "status": "Pending",
        "_id": "66d3fe93d340cf5b92acc7ce",
        "__v": 0
    }
}















{ 
    "firstname": "Satyam",
    "lastname": "gupta",
    "email" : "patients@gmail.com",
    "phone" :1234567890,
    "password" : "12345678",
    "dob" : "11/03/2002",
    "nic": "123456",
    "gender":"Male",
    "role" : "Patient",
    "appointment_date": "1234",
    "department":"Radiology",
    "doctor_firstname": "UMin",
    "doctor_lastname": "Han",
    "address": " Adress sat"

}

//appointment details

{
    "success": true,
    "appointments": [
        {
            "doctor": {
                "firstname": "UMin",
                "lastname": "Han"
            },
            "_id": "66b8b06ceff64ce575be5d31",
            "firstname": "Satyam",
            "lastname": "gupta",
            "email": "patients@gmail.com",
            "phone": "1234567890",
            "nic": "123456",
            "dob": "2002-03-10T18:30:00.000Z",
            "gender": "Male",
            "appointment_date": "1234",
            "department": "Radiology",
            "hasVisted": false,
            "doctorId": "66b7634d45b6a4f6ea50bffa",
            "patientsId": "66af9096dba4b4fca249a9a4",
            "address": " Adress sat",
            "status": "Pending",
            "__v": 0
        }
    ]
}






//update appointment

{
    "success": true,
    "message": "Appointment Status Updated !",
    "appointment": {
        "doctor": {
            "firstname": "UMin",
            "lastname": "Han"
        },
        "_id": "66b8b06ceff64ce575be5d31",
        "firstname": "Yashika",
        "lastname": "gupta",
        "email": "Yashika@gmail.com",
        "phone": "1234567890",
        "nic": "567890",
        "dob": "2002-03-10T18:30:00.000Z",
        "gender": "Male",
        "appointment_date": "1234",
        "department": "Radiology",
        "hasVisted": false,
        "doctorId": "66b7634d45b6a4f6ea50bffa",
        "patientsId": "66af9096dba4b4fca249a9a4",
        "address": " Adress sat",
        "status": "Rejected",
        "__v": 0
    }
}







2.08.02

//auth.js for admin is not working, due to dob