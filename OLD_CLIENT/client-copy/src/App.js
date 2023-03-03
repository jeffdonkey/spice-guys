import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserHomePage from "./components/screens/UserHomePage";
import Register from "./components/screens/Register";
import Login from "./components/screens/Login";
import LandingPage from "./components/screens/LandingPage";
import AuthRoute from "./components/routing/AuthRoute";
import SpiceDisplay from "./components/screens/SpiceDisplay";
import CreateSpicePage from "./components/screens/CreateSpicePage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute exact path="/" component={UserHomePage} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={LandingPage} />
        <Route path="/spices" component={SpiceDisplay} />
        <Route path="spices/create" component={CreateSpicePage} />
        {/*
        <Route path="/spices/:id/edit" component={EditSpice} />
        <Route path="/spices/:id/delete" component={DeleteSpice} />
        */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
