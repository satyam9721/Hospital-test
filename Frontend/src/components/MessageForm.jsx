import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MessageForm = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/message/send",
          { firstname, lastname, phone, email, message },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          //data send successfully then below code empty the messages
          setfirstname("");
          setlastname("");
          setEmail("");
          setPhone("");
          setMessage("");
        });
    } catch (error) {
      //if above response is not send then print the error
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
    <div className="container form-component message-form">
      <h2>Send Us A Message</h2>
      <form onSubmit={handleMessage}>
        <div>

         <input
            type="text"
            placeholder="first Name"
            value={firstname}
            onChange={(e) => setfirstname(e.target.value)}
          />
         
          <input
            type=""
            placeholder="last Name"
            value={lastname}
            onChange={(e) => setlastname(e.target.value)}
          />

        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="number"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

        </div>

        <textarea
          rows={7}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Send</button>
        </div>
        
      </form>
      <img src="/Vector.png" alt="vector" />
    </div>
  </>
  );
};

export default MessageForm;
