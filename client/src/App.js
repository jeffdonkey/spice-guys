import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Routing
import UserRoute from "./components/routes/UserRoute";

// Screens
import User from "./components/screens/User";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import ForgotPassword from "./components/screens/ForgotPassword";
import ResetPassword from "./components/screens/ResetPassword";


const App = () => {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <UserRoute exact path="/" component={ User } />
                    <Route exact path="/login" component={ Login } />
                    <Route exact path="/register" component={ Register } />
                    <Route exact path="/forgotpassword" component={ ForgotPassword } />
                    <Route exact path="/passwordreset/:resetToken" component={ ResetPassword } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
