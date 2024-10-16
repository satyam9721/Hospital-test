import React, { useEffect, useState } from "react";
import axios from "axios";

import Appointmnet from "../pages/Appointmnet";

import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AppointmnetForm = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [nic, setNic] = useState("");
  const [gender, setGender] = useState("");
  // const [appointment_date, setAppointmentDate] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  // const [doctor_firstname, SetDoctorFirstName] = useState("");
  // const [doctor_lastname, SetDoctorLastName] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");

  const [address, setAddress] = useState("");
  const [hasVisted, setHasVisted] = useState("");

  const [department, SetDepartment] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  //creating doctor category

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  //fetching doctors from backend
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchdoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/doctors",
        { withCredentials: true }
      );

      setDoctors(data.doctor);
    };
    fetchdoctors();
  }, []);

  // Filter doctors by selected department
  useEffect(() => {
    if (department) {
      const filtered = doctors.filter(
        (doctor) => doctor.doctorDepartment === department
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  }, [department, doctors]);

  const handleAppointment = async (e) => {
    e.preventDefault();

    try {
      const hasVistedBool = Boolean(hasVisted);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        {
          firstname,
          lastname,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstname: doctorFirstName,
          doctor_lastname: doctorLastName,
          hasVisted: hasVistedBool,
          address,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      toast.success(data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container form-component appointment-form">
      <h2>Appointment</h2>
      <form onSubmit={handleAppointment}>
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setfirstname(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setlastname(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="phone"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="NIC"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
          />

          {/* dob format converted  according to backend */}

          <input
            type={"date"}
            placeholder="DOB"
            value={moment(dob, "DD/MM/YYYY").format("YYYY-MM-DD")}
            onChange={(e) => {
              const inputDate = e.target.value; // "YYYY-MM-DD"
              const formattedDate = moment(inputDate, "YYYY-MM-DD").format(
                "DD/MM/YYYY"
              );

              setDob(formattedDate); // Store in "DD/MM/YYYY"
            }}
          />
        </div>
        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* <input
            type="date"
            placeholder="Appointment Date"

            value={moment(appointmentDate,"DD/MM/YYYY").format("YYYY-MM-DD")}

            onChange={(e)=>{
              const inputDate = e.target.value;
              const formattedDate= moment(inputDate,"YYYY-MM-DD").format(
                "DD/MM/YYYY"
              );
              setAppointmentDate(formattedDate);
            }}
          /> */}

          <input
            type="date"
            placeholder="Appointment Date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>

        <div>
          {/* displaying department category on fronted */}

          <select
            value={department}
            onChange={(e) => {
              SetDepartment(e.target.value);
              // setDoctorFirstName(e.target.value);
              // setDoctorLastName(e.target.value);
            }}
          >
            {departmentsArray.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {/* <label>Select Doctor</label> */}

          <select
            value={selectedDoctor}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setSelectedDoctor(selectedValue);

              // Split the selected doctor name into firstname and lastname
              const [firstname, ...lastname] = selectedValue.split(" ");

              // Set the doctor firstname and lastname
              setDoctorFirstName(firstname);
              setDoctorLastName(lastname.join(" ")); // Join any remaining parts for the lastname
            }}
            disabled={!department}
          >
            <option value="">Select Doctor</option>
            {filteredDoctors.map((doctor) => (
              <option
                key={doctor._id}
                value={`${doctor.firstname} ${doctor.lastname}`}
              >
                {doctor.firstname} {doctor.lastname}
              </option>
            ))}
          </select>
        </div>

        <textarea
          rows="10"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />

        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Have you visted before ?</p>
          <input
            type="checkbox"
            checked={hasVisted}
            onChange={(e) => setHasVisted(e.target.checked)}
            style={{ flex: "none", width: "25px" }}
          />
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Get Appointment</button>
        </div>
      </form>
    </div>
  );
};

export default AppointmnetForm;
