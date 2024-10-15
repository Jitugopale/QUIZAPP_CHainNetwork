import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


const LandingPage = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to the Quiz App</h1>
      <p>Your one-stop solution for testing your knowledge on various topics!</p>
      <div className="d-flex justify-content-center mt-4">
        <Link to="/login" className="btn btn-primary mx-2" aria-label="Login to your account">Login</Link>
        <Link to="/register" className="btn btn-secondary mx-2" aria-label="Create a new account">Register</Link>
      </div>
    </div>
  );
};

export default LandingPage;
