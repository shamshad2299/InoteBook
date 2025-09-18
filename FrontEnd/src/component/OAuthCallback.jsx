import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function OAuthCallback({ showAlert, setUser }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = searchParams.get('token');
    const userStr = searchParams.get('user');
    const error = searchParams.get('error');
    
    if (error) {
      showAlert(`Authentication failed: ${error}`, 'danger');
      navigate('/login');
      return;
    }
    
    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        localStorage.setItem('token', token);
        
        if (setUser) {
          setUser(user);
        }
        
        showAlert("Login successful!", 'success');
        navigate('/addnotes');
      } catch (err) {
        showAlert("Authentication error. Please try again.", 'danger');
        navigate('/login');
      }
    } else {
      showAlert("Authentication incomplete. Please try again.", 'danger');
      navigate('/login');
    }
  }, [searchParams, navigate, showAlert, setUser]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700">
      <div className="bg-white rounded-xl p-8 shadow-lg text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Completing authentication...</h2>
        <p className="text-gray-600">Please wait while we complete your login.</p>
      </div>
    </div>
  );
}

export default OAuthCallback;