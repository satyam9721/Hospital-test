import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [department, setDepartment] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  // Departments for the dropdown
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

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctor);
    };

    fetchDoctors();
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

  return (
    <div className="container form-component appointment-form">
      <h2>Appointment Form</h2>

      {/* Department Dropdown */}
      <div>
        <label>Select Department</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          {departmentsArray.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Doctor Dropdown */}
      <div>
        <label>Select Doctor</label>
        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
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
    </div>
  );
};

export default AppointmentForm;