import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";

//not redirecting home page also not showing logout button

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  //const { isAuthenticated, setIsAuthenticated } = useState(false);

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [nic, setNic] = useState("");
  const [gender, setGender] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/patient/register",
        {
          firstname,
          lastname,
          email,
          phone,
          password,
          dob,
          nic,
          gender,
          role: "Patient",
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Login successful:", response.data.message);

      toast.success(response.data.message);
      setIsAuthenticated(true);

      navigateTo("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container form-component register-form">
      <h2>Sign up</h2>
      <p>Please Sign Up To Continue</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
        officia eveniet incidunt nisi quibusdam animi excepturi, laudantium
        error blanditiis omnis totam adipisci repellendus! Placeat, vero
        praesentium et in inventore voluptates! Ad, unde commodi. Quisquam
ab natus porro? !
      </p>

      <form onSubmit={handleRegister}>
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

          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Already Registered ?</p>
          <Link
            to={"/login"}
            style={{ textDecoration: "none", alignItems: "center" }}
          >
            Login Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
