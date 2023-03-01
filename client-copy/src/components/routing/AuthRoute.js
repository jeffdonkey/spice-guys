import { Redirect, Route } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => { // component: Component (object) is used to rename the component prop to Component

    // If the user is logged in, render the component, else redirect to login page
    return (
        <Route
            { ...rest } // The spread operator passes all the props to the Route component
            render={  // The render prop is used to render a component object when the current URL matches the path prop
                (props) => // The props argument contains the history, location, and match objects

                // If the user is logged in, render the component; if not, redirect to login page
                localStorage.getItem("authToken") ? ( 
                    <Component { ...props } /> // The spread operator passes all the props to the component
                ) : (
                    <Redirect to="/login" /> // Redirect to login page
                )
            }
        />
    );
};

export default AuthRoute;