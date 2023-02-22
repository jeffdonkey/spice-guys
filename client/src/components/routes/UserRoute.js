import { Navigate, Route } from "react-router-dom";

const UserRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
        { ...rest }
        render={ (props) =>
            localStorage.getItem("authToken")
                ? (<Component { ...props } />)
                : (<Navigate to="/login" />)
        } />
    );
};

export default UserRoute;
