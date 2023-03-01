import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Routing
import AuthRoute from "./components/routing/AuthRoute";

// Screens
import UserHomePage from "./components/screens/UserHomePage";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import ForgotPassword from "./components/screens/ForgotPassword";
import ResetPassword from "./components/screens/ResetPassword";
import LandingPage from "./components/screens/LandingPage";

const App = () => {
    return (
      <Router>
        <div className="app">
          <Switch>
            <LandingPage />
            <AuthRoute exact path="/" component={UserHomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route
              exact
              path="/passwordreset/:resetToken"
              component={ResetPassword}
            />
          </Switch>
        </div>
      </Router>
    );
};

export default App;
