import axios from "axios";
import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ShopContext } from "../../pages/context/ShopContext.jsx";
import { toast } from "react-toastify"; // Make sure to install and import react-toastify
import "react-toastify/dist/ReactToastify.css"; // React-toastify CSS
import apiBaseUrl from "../../config/api";

const SignUpForm = ({setShowLogin, toggleForm,close }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",

  });
  const [showPassword, setShowPassword] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const {setToken} = useContext(ShopContext)
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      toast.error("Please accept the Terms and Conditions to proceed.");
      return;
    }
    try {
      const response = await axios.post(`${apiBaseUrl}/api/user/register`, formData); // Replace `newUrl` and `data` with your variables
  
      if (response.data.success) {
        // Store the token and handle success
        setToken(response.data.token); // Assumes setToken is a state handler
        localStorage.setItem("token", response.data.token);        
        toast.success("Login successful!"); // Use Toastify for success message
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        close();
        setShowLogin(false)
      } else {
        // Handle errors
        toast.error(response.data.message); // Use Toastify for error message
      }
    } catch (error) {
      // Catch and handle any other errors
      console.error("Error during submission:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Registration</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-left text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-left text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <label className="block text-left text-gray-700">Password</label>
          <input
            type={showPassword ? "password" : "text"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-9 text-gray-500 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="termsAccepted"
            onClick={()=>setTermsAccepted(!termsAccepted)}
            className="mr-2"
            
          />
          <label className="text-gray-700">I accept the Terms and Conditions</label>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Create an account
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <button onClick={toggleForm} className="text-blue-500 hover:text-blue-700">
          Login here
        </button>
      </p>
    </div>
  );
};

export default SignUpForm;
