import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Components
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Pages
import HomePage from "./pages/HomePage";

const App = () => {
    return (
        <Router>
        <div className="app">
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/forgotpassword" component={ForgotPassword} />
                <Route exact path="/passwordreset/:resetToken" component={ResetPassword} />
            </Switch>
        </div>
        </Router>
    );
};

export default App;