import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = ({ history }) => {

    // State variables; values and onChange handlers in jsx will be bound to these
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // This will be used to store error messages

    // Once the user is logged in, we don't want them to be directed to the login page again
    useEffect(() => {
        if (localStorage.getItem("authToken")) { // If the user is logged in
            history.push("/"); // Redirect the user to the home page
        }
    }, [history]); // Add the history object to the dependency array so that the useEffect hook runs when the history object changes

    // loginHandler function that will be called when the form is submitted; will be bound to the onSubmit event of the form
    const loginHandler = async (e) => {
        e.preventDefault(); // Prevent the default behavior of the form; i.e. prevent the page from reloading

        // The config object (JSON data) that we will pass to axios in the try block
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        };

        try { // Try to make a post request to the login endpoint
            const { data } = await axios.post(
                "/api/auth/login",
                { email, password },
                config
            );

            localStorage.setItem("authToken", data.token); // Set the auth token in local storage to the token returned from the server
            history.push("/"); // Direct the user to the home page

        } catch(error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="login">
            <form onSubmit={ loginHandler } className="login-form">
                <h3 className="login-title">Login</h3>

                {/* If there is an error, display the error message */}
                { error && <span className="error-message">{ error }</span> }

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        required
                        id="email"
                        placeholder="Enter email"
                        onChange={ (e) => setEmail(e.target.value) }
                        value={ email }
                        tabIndex={ 1 }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">
                        Password:{ " " }
                        <Link to="/forgotpassword" className="login-forgotpassword">Forgot Password?</Link>
                    </label>
                    <input
                        type="password"
                        required
                        id="password"
                        autoComplete="true"
                        placeholder="Enter password"
                        onChange={ (e) => setPassword(e.target.value) }
                        value={ password }
                        tabIndex={ 2 }
                    />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
                
                <span className="login-subtext">
                    Don't have an account? <Link to="/register">Register</Link>
                </span>
            </form>
        </div>
    );
};

export default Login;