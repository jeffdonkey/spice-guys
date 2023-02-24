import { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";

const ForgotPassword = () => {

    // State variables
    const [email, setEmail] = useState("");  // value and onChange handler in jsx will be bound to these

    // Stores error and success messages
    const [error, setError] = useState("");  // error message to display in jsx; setError will be called in the catch block
    const [success, setSuccess] = useState("");  // success message to display in jsx; setSuccess will be called in the try block

    // Handler function that will be called when the form is submitted
    const forgotPasswordHandler = async (e) => {
        e.preventDefault();  // Prevent the default behavior of the form; i.e. prevent the page from reloading

        // The JSON data we will pass to axios in the try block
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {  // Try to make a post request to the forgot password endpoint
            const { data } = await axios.post(
                "/api/auth/forgotpassword",
                { email },
                config
            );

            setSuccess(data.data); // Set the success message to the success message returned from the server

        } catch(error) {
            setError(error.response.data.error);  // Set the error message to the error message returned from the server
            setEmail("");  // Clear the email field
            setTimeout(() => {  // Set a timeout to clear the error message after 5 seconds
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="forgotpassword">
            <form onSubmit={ forgotPasswordHandler } className="forgotpassword-form">
                <h3 className="forgotpassword-title">Forgot Password</h3>

                {/* If there is an error, display the error message */}
                { error && <span className="error-message">{ error }</span> }

                {/* If the email is successfully submitted, display the success message */}
                { success && <span className="success-message">{ success }</span> }

                <div className="form-group">
                    <p className="forgotpassword-subtext">
                        Please enter the email address you registered your account with. We
                        will send you a link to reset your  password.
                    </p>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        required
                        id="email"
                        placeholder="Enter email"
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