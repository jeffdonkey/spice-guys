import { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";

const ForgotPassword = () => {
    // State variables
    const [email, setEmail] = useState(""); // Stores the email address entered by the user
    const [error, setError] = useState(""); // Stores the potential error message
    const [success, setSuccess] = useState("");  // Stores the potential success message

    // This function is called when the user clicks the "Send Email" button
    const forgotPasswordHandler = async (e) => { 
        e.preventDefault(); // Prevents the page from reloading

        const config = { // This is the configuration object for the axios request
            header: { // config includes the header object
                "Content-Type": "application/json"
            }
        };

        // Try to send the email address object to the server as POST request
        try {
          const { data } = await axios.post(
            // Data is the response (an object) from the server
            "/api/auth/forgotpassword", // The URL to send the request to
            { email }, // The data to send in the request body
            config // The configuration object above
          );

          setSuccess(data.data); // Set the success message to the message returned by the server

          // If there is an error
        } catch (error) {
            setError(error.response.data.error); // Set the error message to the message returned by the server
            setEmail(""); // Clear the email address
            setTimeout(() => { // After 5 seconds
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="forgotpassword">
            <form onSubmit={ forgotPasswordHandler } className="forgotpassword__form">
                <h3 className="forgotpassword__title">Forgot Password</h3>
                { error && <span className="error-message">{ error }</span> }
                { success && <span className="success-message">{ success }</span> }
                <div className="form-group">
                    <p className="forgotpassword__subtext">
                        Please enter the email address you register your account with. We will send you reset password confirmation to this email.
                    </p>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        required
                        id="email"
                        placeholder="Email address"
                        value={ email }
                        onChange={ (e) => setEmail(e.target.value) }
                    />
                </div>
                <button type="submit" className="btn btn-primary">Send Email</button>
            </form>
        </div>
    );
};

export default ForgotPassword;