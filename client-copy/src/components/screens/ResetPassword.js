import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AuthScreens.css";

const ResetPassword = ({ match }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const resetPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        // If the passwords don't match, we want to clear the password fields & set an error message
        if(password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords don't match");
        }

        try {
            const { data } = await axios.put(
                `/api/auth/resetpassword/${match.params.resetToken}`, // match.params.resetToken is the token from the url
                { password },
                config
            );

            // console.log(data);
            setSuccess(data.data);

        } catch(error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="resetpassword">
            <form onSubmit={ resetPasswordHandler } className="resetpassword-form">
                <h3 className="resetpassword-title">Forgot Password</h3>

                {/* If there is an error, display the error message from the catch block */}
                { error &&
                    <span className="error-message">
                         { error }
                    </span> }

                {/* If password is updated, display the success message (from the try block) and direct to the login */}
                { success && 
                    <span className="success-message">
                        { success }
                        <Link to="/login">Login</Link>
                    </span> }

                <div className="form-group">
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        required
                        id="password"
                        placeholder="Enter new password"
                        autoComplete="true"
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                        tabIndex={ 1 }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmpassword">Confirm New Password:</label>
                    <input
                        type="password"
                        required
                        id="confirmpassword"
                        placeholder="Confirm new password"
                        autoComplete="true"
                        value={ confirmPassword }
                        onChange={ (e) => setConfirmPassword(e.target.value) }
                        tabIndex={ 2 }
                    />
                </div>

                <button type="submit" className="btn btn-primary">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;