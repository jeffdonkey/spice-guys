import { useState, useEffect } from "react"; // Import the useState hook for creating state variables and useEffect hook for running side effects
import axios from "axios"; // Import axios for making API requests
import { Link } from "react-router-dom"; // Import the Link component for creating links
import "./AuthScreens.css";

const Register = ({ history }) => { // Destructure the history prop from the props object; used for redirecting the user

    // State variables; values and onChange handlers in jsx will be bound to these
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); // This will be used to store error messages
    
    // Once the user is registered, don't need to direct to this page again
    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            history.push("/");
        }
    }, [history]); 
    
    // registerHandler function that will be called when the form is submitted; will be bound to the onSubmit event of the form
    const registerHandler = async (e) => {
        e.preventDefault(); // Prevent the default behavior of the form; i.e. prevent the page from reloading

        // The config object (JSON data) that we will pass to axios in the try block
        const config = {
            headers: { // The header property is used to set the content type of the request
                "Content-Type": "application/json"
            }
        };

        // If the passwords don't match, we want to clear the password fields and set an error message
        if(password !== confirmPassword) {
            setPassword(""); // Clear the password field
            setConfirmPassword(""); // Clear the confirm password field
            setTimeout(() => { // Set a timeout to clear the error message after 5 seconds
                setError("");
            }, 5000);
            return setError("Passwords don't match"); // Set the error message
        }

        try { // Try to make a post request to the register endpoint
            const { data } = await axios.post( // Destructure the data property from the response object
                "/api/auth/register", // The endpoint
                { username, email, password }, // The data to send to the endpoint
                config // The config object
            );

            localStorage.setItem("authToken", data.token); // Set the auth token in local storage

            history.push("/"); // Redirect the user to the home page

        } catch(error) { // If there is an error
            setError(error.response.data.error); // Set the error message to the axios error message from the response
            setTimeout(() => { // Set a timeout to clear the error message after 5 seconds
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="register">

            <form onSubmit={ registerHandler } className="register-form">
                <h3 className="register-title">Register</h3>

                {/* If there is an error, display the error message from the catch block */}
                { error && <span className="error-message">{ error }</span> }

                <div className="form-group">
                    <label htmlFor="name">Username:</label>
                    <input
                        type="text"
                        required
                        id="name"
                        placeholder="Enter username"
                        value={ username }
                        onChange={ (e) => setUsername(e.target.value) }
                        tabIndex={ 1 }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        required
                        id="email"
                        placeholder="Enter email"
                        value={ email }
                        onChange={ (e) => setEmail(e.target.value) }
                        tabIndex={ 2 }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        required
                        id="password"
                        autoComplete="true"
                        placeholder="Enter password"
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                        tabIndex={ 3 }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmpassword">Confirm Password:</label>
                    <input
                        type="password"
                        required
                        id="confirmpassword"
                        autoComplete="true"
                        placeholder="Confirm password"
                        value={ confirmPassword }
                        onChange={ (e) => setConfirmPassword(e.target.value) }
                        tabIndex={ 4 }
                    />
                </div>

                <button type="submit" className="btn btn-primary">Register</button>

                <span className="register-subtext">
                    Already have an account? <Link to="/login">Login</Link>
                </span>
            </form>
        </div>
    );
};

export default Register;