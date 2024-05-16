import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

function Validation() {
    const [error, setError] = useState("");

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      console.error("Token is missing");
      setError("Token is missing");
      return;
    }

    console.log(token);

    axios
      .post("http://localhost:8081/validate", { token })
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          window.location.replace("/login");
        }, 5000);
      })
      .catch(() => {
        setError("The link is not available");
        setTimeout(() => {
          window.location.replace("/login");
        }, 2000);
      });
  }, []);

  return (
    <div style={styles.container}>
      {error ? (
        <p style={styles.errorText}>The link is not available</p>
      ) : (
        <p style={styles.validationText}>The account is being validated...</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  errorText: {
    color: "red",
    fontSize: "24px",
    fontWeight: "bold",
  },
  validationText: {
    fontSize: "24px",
  },
}

export default Validation
