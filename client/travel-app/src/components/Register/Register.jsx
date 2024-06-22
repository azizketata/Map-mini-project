import React, { useRef } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Importing an icon (not used in this code)
import CancelIcon from "@mui/icons-material/Cancel"; // Importing a cancel icon
import "./Register.css"; // Importing CSS for styling
import axios from "axios"; // Importing axios for making HTTP requests

const Register = ({ setShowRegister }) => {
  // Using useRef hook to create references for form inputs
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create a new user object with values from form inputs
    const newUser = {
      userName: nameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
    };

    try {
      // Send a POST request to the server to register a new user
      const response = await axios.post("/users/register", newUser);
      console.log(response); // Log the response for debugging
      // Notify the user of successful registration (e.g., using a notification library)
      setShowRegister(false); // Close the registration form
    } catch (err) {
      console.log(err); // Log the error for debugging
    }
  };

  return (
    <div className="register_container">
      <div className="application">Create a profile.</div>

      {/* Registration form */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="userName" ref={nameRef}></input>
        <input type="text" placeholder="email" ref={emailRef}></input>
        <input type="text" placeholder="password" ref={passRef}></input>
        <button className="register_button">Register</button>
      </form>

      {/* Cancel icon to close the registration form */}
      <CancelIcon
        className="register_cancel"
        onClick={() => setShowRegister(false)}
      ></CancelIcon>
    </div>
  );
};

export default Register; // Exporting the Register component as default
