import React, { useRef } from "react"; // Import React and useRef hook
import CancelIcon from "@mui/icons-material/Cancel"; // Import Cancel icon from Material UI
import "./Login.css"; // Import CSS for styling
import axios from "axios"; // Import axios for HTTP requests

// Login component that takes setShowLogin and setCurrentUser as props
const Login = ({ setShowLogin, setCurrentUser }) => {
  // Creating references for the input fields
  const nameRef = useRef();
  const passRef = useRef();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create a new user object with values from the input fields
    const newUser = {
      userName: nameRef.current.value,
      password: passRef.current.value,
    };

    try {
      // Send a POST request to the server for user login
      const response = await axios.post("/users/login", newUser);
      // Produce a success notification
      console.log(response); // Log the response for debugging
      setCurrentUser(response.data.userName); // Set the current user
      setShowLogin(false); // Close the login form
    } catch (err) {
      // Produce a failure notification
      console.log(err); // Log the error for debugging
    }
  };

  return (
    <div className="login_container">
      <div className="application">Login to your profile</div>

      {/* Login form */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="password" placeholder="password" ref={passRef} />
        <button type="submit" className="login_button">
          Login
        </button>
      </form>

      {/* Cancel icon to close the login form */}
      <CancelIcon
        className="login_cancel"
        onClick={() => setShowLogin(false)}
      />
    </div>
  );
};

export default Login; // Export the Login component as default
