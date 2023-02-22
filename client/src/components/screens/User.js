import { useState, useEffect } from "react"; // use the useEffect hook to make an API call to the server
import axios from "axios"; // use axios to make the API call
import "./User.css";

const User = ({ history }) => { // use the history object to redirect the user to the login page
    const [error, setError] = useState(""); // use the error state to display any errors
    const [privateData, setPrivateData] = useState(""); // use the privateData state to display the data from the server

    useEffect(() => { // use the useEffect hook to make an API call to the server

        if(!localStorage.getItem("authToken")) {  // if the user is not logged in redirect them to the login page   
            history.push("/login");
        }

        const fetchPrivateData = async () => { // use the fetchPrivateData function to make the API call
            const config = { // use config object to set headers
                headers: {
                    "Content-Type": "application/json",  // set the content type to JSON
                    Authorization: `Bearer ${localStorage.getItem("authToken")}` // set authorization header to the token stored in local storage
                }
            };

            try {
                const { data } = await axios.get("/api/private", config); // this is the route we created in the server
                setPrivateData(data.data); // data.data is the data from the server

            } catch (error) {  // if the user is not authorized remove the token from local storage, redirect them to the login page
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }
        }; // end of fetchPrivateData

        fetchPrivateData(); // need to call the fetchPrivateData function to make the API call
    }, [history]); // end of useEffect

    const logoutHandler = () => { // use logoutHandler to remove the token from local storage and redirect user to the login page
        localStorage.removeItem("authToken");
        history.push("/login");
    }; 

    return ( // return the private data or the error message
        error ? ( // if there is an error, display the error message
            <span className="error-message">{ error }</span>
        ) : (  // if there is no error, display the private data and a logout button
            <>
                <div style={{ background: "green", color: "white" }}>{ privateData }</div>
                <button onClick={ logoutHandler }>Logout</button>
            </>
        )
    );
};

export default User;