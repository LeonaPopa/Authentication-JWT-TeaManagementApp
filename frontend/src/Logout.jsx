import React from 'react'
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.clear();
      navigate("/login");
    };
  
    return (
      <button className="delete-button" onClick={handleLogout}>
        Logout
      </button>
    );
}

export default Logout
