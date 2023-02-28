import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Components
import Navbar from "./components/Navbar";
import Backdrop from "./components/Backdrop";
import SideBar from "./components/Sidebar";
import Footer from "./components/Footer";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import PrivateRoute from "./routing/PrivateRoute";
import PrivateScreen from "./pages/PrivateScreen";

const App = () => {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <Switch>
                    <Route exact path="/login" component={ Login } />
                    <Route exact path="/register" component={ Register } />
                    <Route exact path="/forgotpassword" component={ ForgotPassword } />
                    <Route exact path="/passwordreset/:resetToken" component={ ResetPassword } />
                    <PrivateRoute exact path="/" component={ PrivateScreen } />
                </Switch>
            </div>
        </Router>
    );
};

export default App;