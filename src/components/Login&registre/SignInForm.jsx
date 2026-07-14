import React, { useContext, useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ShopContext } from "../../pages/context/ShopContext.jsx";
import apiBaseUrl from "../../config/api";


import { toast } from "react-toastify"; // Make sure to install and import react-toastify
import "react-toastify/dist/ReactToastify.css"; // React-toastify CSS



const SignInForm = ({setShowLogin,  toggleForm,close  }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false); // State for terms acceptance

  const [showPassword, setShowPassword] = useState(true);
  const {setToken} = useContext(ShopContext)
 
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
      const response = await axios.post(`${apiBaseUrl}/api/user/login`,formData );

      if (response.data.success) {
        // Handle success
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token); // Store JWT token
        toast.success("Login successful!");
         // Clear the form fields
         setFormData({
          email: "",
          password: "",
        });

        close();
        setShowLogin(false)
      } else {
        // Handle error from server
        toast.error(response.data.message);

      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Error during submission:", error);
      toast.error("An unexpected error occurred. Please try again.");
      if (error.response?.status === 409) {
        toast.error("Your account has been banned!");
      }
      
    }
  };


   // Toggle password visibility
   const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
      <p className="text-gray-600 mb-6">
        Sign in to your account and explore a world of possibilities. Your journey begins here.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-left text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
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
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-9 text-gray-500 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mr-2"
            />
            Accept Terms and Conditions
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Log in
        </button>
      </form>
      <p className="mt-4">
        Don't have an account?{" "}
        <button onClick={toggleForm} className="text-blue-500 hover:text-blue-700">
          Register here
        </button>
      </p>
    </div>
  );
};

export default SignInForm;
