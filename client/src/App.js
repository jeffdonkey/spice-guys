import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import SpiceState from "./context/SpiceState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./components/LandingPage";
import ShowSpice from "./components/ShowSpice";

function App() {
  // Set initial state for alert as null
  const [alert, setAlert] = useState(null);

  // Function to show alert which takes 2 args, msg & type
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };

  return (
    <>
      {/* Use SpiceState so any child will use context */}
      <SpiceState>
        <Router>
          <Header />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route exact path="/home" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/showspice" element={<ShowSpice />} />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </Router>
      </SpiceState>
    </>
  );
}

export default App;