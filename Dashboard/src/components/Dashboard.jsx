import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { isAuthenticated, user } = useContext(Context);

  const [appointments, setAppointments] = useState([]);

  // useEffect(() => {
  //   const adminToken = localStorage.getItem("authToken");
  //   console.log("Admin Token:", adminToken); // Debug log
  
  //   if (adminToken) {
  //     axios
  //       .get("http://localhost:4000/api/v1/appointment/getall", {
  //         headers: {
  //           Authorization: `Bearer ${adminToken}`,
  //         },
  //       })
  //       .then((response) => {
  //         console.log("API Response: ", response.data); // Debug log to check response
  //         if (response.data.success) {
  //           setAppointments(response.data.appointments);
  //         } else {
  //           toast.error(response.data.message);
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("Error: ", err); // Log the error response
  //         toast.error("Failed to fetch appointments.");
  //       });
  //   } else {
  //     toast.error("Admin Not Authenticated!!");
  //   }
  // }, [isAuthenticated]);
  
  useEffect(() => {
    const adminToken = localStorage.getItem("authToken");
    
    if (adminToken) {
      axios
        .get("http://localhost:4000/api/v1/appointment/getall", {
          headers: {
            Authorization: `Bearer ${adminToken}`,  // Include Authorization header
          },
        })
        .then((response) => {
          console.log("API Response: ", response.data); // Debug log to check response
          if (response.data.success) {
            setAppointments(response.data.appointments);  // Set appointments in state
          } else {
            toast.error(response.data.message);  // Show error message
          }
        })
        .catch((err) => {
          
          console.error("Error: ", err);  // Log error
          toast.error("Failed to fetch appointments.");  // Display error notification
          console.log("Admin Token:", adminToken);
        });
    } else {
      toast.error("Admin Not Authenticated!!");  // Show authentication error
    }
  }, [isAuthenticated]);
  
  


  

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          withCredentials: true,
        }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, status } : appointment
        )
      );
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update appointment.");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="dashboard">
      {/* Banner Section */}
      <div className="banner">
        <div className="firstBox">
          <img src="/doc.png" alt="Doctor Image" />
          <div className="content">
            <div>
              <p>Hello</p>
              <h5>{user && `${user.firstname} ${user.lastname}`}</h5>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi
              consequuntur unde deleniti cumque dicta fuga sapiente autem
              explicabo vitae magni nam, sed similique sint, cum hic minus,
              numquam ab ex?
            </p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointments</p>
          <h3>15000</h3>
        </div>
        <div className="thirdBox">
          <p>Registered Doctors</p>
          <h3>20</h3>
        </div>
      </div>

      {/* Appointments Section */}
      <div className="banner appointments-section">
        <h5>Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((appoint) => (
                <tr key={appoint._id}>
                  <td>{`${appoint.firstname} ${appoint.lastname}`}</td>
                  <td>{appoint.appointment_date}</td>
                  <td>{`${appoint.doctor.firstname} ${appoint.doctor.lastname}`}</td>
                  <td>{appoint.department}</td>
                  <td>
                    <select
                      className={
                        appoint.status === "Pending"
                          ? "value-pending"
                          : appoint.status === "Rejected"
                          ? "value-rejected"
                          : "value-accepted"
                      }
                      value={appoint.status}
                      onChange={(e) =>
                        handleUpdateStatus(appoint._id, e.target.value)
                      }
                    >
                      <option value="Pending" className="value-pending">
                        Pending
                      </option>
                      <option value="Accepted" className="value-accepted">
                        Accepted
                      </option>
                      <option value="Rejected" className="value-rejected">
                        Rejected
                      </option>
                    </select>
                  </td>
                  <td>
                    {appoint.hasVisited ? (
                      <GoCheckCircleFill className="green" />
                    ) : (
                      <AiFillCloseCircle className="red" />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <h1>No Appointments!</h1>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
