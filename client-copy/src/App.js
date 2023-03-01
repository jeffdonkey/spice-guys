import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; //

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens

import PrivateScreen from "./components/screens/PrivateScreen";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import ForgotPassword from "./components/screens/ForgotPassword";
import ResetPassword from "./components/screens/ResetPassword";
import Home from "./Home2";
// import Navigation from "./Navigate";
import ShowSpice from "./ShowSpice";

// import ShowSpice from "./ShowSpice";



function App() {
    return ( // The Router component wraps the entire app; is used to provide the app with routing functionality
        <Router>
            
            {/* <Navigation /> */}
            <div className="app">


                {/* The Switch component is used to render the first route that matches the current URL */}
                <Switch>

                    {/* The Route components render a component when the current URL matches the path prop */}
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/forgotpassword" component={ForgotPassword} />
                    <Route exact path="/passwordreset/:resetToken" component={ResetPassword} />
                    <Route exact path="/ShowSpice" component={ShowSpice} />


                    {/* The PrivateRoute component renders a component if the user is logged in, else redirects to login page */}
                    <PrivateRoute exact path="/" component={PrivateScreen} />

                </Switch>
                    

            </div>

        </Router>
    );
}

export default App;
