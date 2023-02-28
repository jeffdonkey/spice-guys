import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">

            {/* logo */}
            <div className="navbar_logo">
                <h2>Logo</h2>
            </div>

            {/* links */}
            <ul className="navbar_links">
                <li className="nav_link">
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li className="nav_link">
                    <Link to="/login">
                        Login
                    </Link>
                </li>
                <li className="nav_link">
                    <Link to="/register">
                        Sign Up
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;