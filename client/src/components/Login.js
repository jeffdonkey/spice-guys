
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';


const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('authToken', json.authToken);
            navigate('/');
            props.showAlert('Logged in successfully!', 'success');
        } else {
            props.showAlert('Invalid credentials!', 'danger');
        }
    };

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Container className='mt-3' style={{ width: '70%' }}>
            <Form onSubmit={ handleSubmit }>
                <h2>Log In to Continue</h2>
                <Form.Group className='mb-3'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type='email' value={ credentials.email } id='email' name='email' onChange={ onChange }  autoComplete='off' aria-describedby='emailHelp' />
                    <Form.Text id='emailHelp' className='text-muted'>We'll never share your email address with anyone</Form.Text>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' value={ credentials.password } id='password' name='password' onChange={ onChange } autoComplete='off' />
                </Form.Group>
                <Button type='submit' variant='primary'>Submit</Button>
            </Form>
        </Container>
    );
};


=======
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
            headers: {
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