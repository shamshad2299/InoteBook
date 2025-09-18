import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { allAPI } from "../API_Container/allApi";
import { errorCatcher } from "../ErrorCatcher/allError";
import Swal from "sweetalert2";
import Loading from "./Loading";

function SignUp({credentials, setCredentials }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!credentials.name || credentials.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }
    
    if (!credentials.email || !/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!credentials.password || credentials.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    
    if (credentials.password !== credentials.cpassword) {
      newErrors.cpassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      Swal.fire({
        title : `please validate ${errors}` ,
        icon : "error",
      })
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await fetch(`${allAPI.Signup.url}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: credentials.name, 
          email: credentials.email, 
          password: credentials.password
        })
      });
      
      const json = await response.json();
      
      if (json.success) {
        setIsLoading(false);
        localStorage.setItem('token', json.authToken);
        navigate("/login");
         Swal.fire({
          title :"Signup/Registerd success",
          icon : "success",
        })
      } else {
        Swal.fire({
          title :json.error || "Invalid credentials",
          icon : "error" 
        })
      }
    } catch (error) {
      errorCatcher(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (event) => {
    setCredentials({...credentials, [event.target.name]: event.target.value});
    // Clear error when user starts typing
    if (errors[event.target.name]) {
      setErrors({...errors, [event.target.name]: ""});
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
 isLoading ? <Loading/> :  
  <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-700 p-5 font-sans">
      {/* Background shapes */}
      <div className="absolute w-full h-full top-0 left-0 z-10">
        <div className="absolute w-72 h-72 rounded-full bg-white/10 -top-24 -left-24"></div>
        <div className="absolute w-48 h-48 rounded-full bg-white/10 -bottom-12 -right-12"></div>
        <div className="absolute w-36 h-36 rounded-full bg-white/10 top-1/2 left-3/4"></div>
      </div>
      
      {/* Signup card */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-10 shadow-2xl w-full max-w-md z-20 border border-white/30">
        {/* Card header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-700 rounded-full flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm0 2.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM6.5 8a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-3z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
          <p className="text-gray-600 text-sm">Join us and start organizing your thoughts</p>
        </div>

        {/* Signup form */}
        <form onSubmit={handleSubmit} className="mb-6">
          {/* Name field */}
          <div className="mb-5">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-gray-500 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
              </span>
              <input
                onChange={handleOnChange}
                type="text"
                className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`}
                id="name"
                name="name"
                value={credentials.name || ''}
                placeholder="Enter your full name"
              />
            </div>
            {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
          </div>

          {/* Email field */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-gray-500 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                </svg>
              </span>
              <input
                onChange={handleOnChange}
                type="email"
                className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`}
                id="email"
                name="email"
                value={credentials.email || ''}
                placeholder="name@company.com"
              />
            </div>
            {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
          </div>

          {/* Password field */}
          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-gray-500 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`}
                id="password"
                name="password"
                value={credentials.password || ''}
                onChange={handleOnChange}
                placeholder="Create a strong password"
              />
              <span className="absolute right-3 top-3.5 text-gray-500 cursor-pointer z-10" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                  </svg>
                )}
              </span>
            </div>
            {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
          </div>

          {/* Confirm Password field */}
          <div className="mb-6">
            <label htmlFor="cpassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-gray-500 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                </svg>
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors ${errors.cpassword ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`}
                id="cpassword"
                name="cpassword"
                value={credentials.cpassword || ''}
                onChange={handleOnChange}
                placeholder="Confirm your password"
              />
              <span className="absolute right-3 top-3.5 text-gray-500 cursor-pointer z-10" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                  </svg>
                )}
              </span>
            </div>
            {errors.cpassword && <div className="text-red-600 text-sm mt-1">{errors.cpassword}</div>}
          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            className={`w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 ${isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-lg'}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-transparent border-t-white rounded-full animate-spin"></span>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Login redirect */}
        <div className="text-center text-gray-600 text-sm mb-4">
          Already have an account? <a href="/login" className="text-indigo-600 font-semibold hover:text-purple-700 hover:underline transition-colors">Sign in</a>
        </div>

        {/* Terms */}
        <div className="text-center text-gray-500 text-xs">
          By creating an account, you agree to our <a href="#terms" className="text-indigo-600 hover:text-purple-700 hover:underline transition-colors">Terms of Service</a> and <a href="#privacy" className="text-indigo-600 hover:text-purple-700 hover:underline transition-colors">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;