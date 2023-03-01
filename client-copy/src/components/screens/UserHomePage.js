import { useState, useEffect } from "react";
import axios from "axios";
import SpiceDisplay from "./SpiceDisplay";

const UserHomePage = ({ history }) => {
  // Destructure the history prop from the props object; used for redirecting the user

  // State variables
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState(""); // Used to store the users/admin private data

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      // If the user is not logged in
      history.push("/login"); // Redirect the user to the login page
    }

    // Fetch the private data
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Set the authorization header
        },
      };

      try {
        // Try to make a get request to the private endpoint
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data); // Set the private data to the data property of the response object
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized. Please login");
      }
    };
    fetchPrivateData(); // Call the fetchPrivateData function
  }, [history]); // The useEffect hook will run when the history prop changes

  const logoutHandler = () => {
    // Function that will be called when the logout button is clicked
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  return (
    // If there is an error, display the error message
    error ? (
      <span className="error-message">{error}</span>
    ) : (
      // If there is no error, display the private data and logout button
      <>
        <button onClick={logoutHandler}>Logout Button</button>
        <SpiceDisplay />
      </>
    )
  );
};

export default UserHomePage;
