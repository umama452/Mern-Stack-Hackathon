import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7fafc', 
      }}
    >
      <h1
        style={{
          fontSize: '2.25rem', 
          fontWeight: '700',  
          marginBottom: '1.5rem', 
        }}
      >
        Welcome to Todo App!
      </h1>
      <Link
        to="/login"
        style={{
          padding: '0.5rem 1.5rem', 
          backgroundColor: '#3182ce', 
          color: 'white',
          borderRadius: '0.375rem', 
          textDecoration: 'none', 
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#2b6cb0'; 
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#3182ce'; 
        }}
      >
        Go to Login
      </Link>
    </div>
  );
};

export default Home;

