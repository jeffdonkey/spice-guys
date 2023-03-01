import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserHomePage from "./components/screens/UserHomePage";
import Register from "./components/screens/Register";
import Login from "./components/screens/Login";
import LandingPage from "./components/screens/LandingPage";
import AuthRoute from "./components/routing/AuthRoute";
import SpiceDisplay from "./components/screens/SpiceDisplay";

function App() {
  return (
    <Router>
      <Switch>
        <AuthRoute exact path="/" component={UserHomePage} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/landingpage" component={LandingPage} />
        <Route path="/spices" component={SpiceDisplay} />
      </Switch>
    </Router>
  );
};

export default App;
