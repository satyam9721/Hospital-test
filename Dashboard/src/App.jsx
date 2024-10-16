import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import AddNewAdmin from "./components/AddNewAdmin";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Context } from "./main";
import "./App.css";
import axios from "axios";

const App = () => {
  // const{isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        //here modifyed get to post
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Dashboard />
           </ProtectedRoute>
          } />


          <Route path="/login" element={
           
            <Login />
         
            
            } />


          <Route
            path="/doctor/addnew"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AddNewDoctor />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/doctor/addnew" element={<AddNewDoctor/>} /> */}
          <Route
            path="/admin/addnew"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AddNewAdmin />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/admin/addnew" element={<AddNewAdmin />} /> */}

          <Route
            path="/messages"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Messages />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/messages" element={<Messages />} /> */}
          <Route
            path="/doctors"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Doctors />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/doctors" element={<Doctors />} /> */}
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
