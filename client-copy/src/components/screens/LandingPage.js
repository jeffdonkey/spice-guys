import image from "./images/mixed.png";
import "./LandingPage.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <main>
      <h1>Spice Guys 🌿</h1>
      <div>
        <img src={image} alt="spices" />
        <div>
          <h2>
            Spice Guys is a spice shop that catalogs a variety of spices and
            herbs.
            <p>
              <Link to="/login">Login</Link>
              or
              <Link to="/register">Register</Link>
              to continue.
            </p>
          </h2>
        </div>
      </div>
    </main>
  );
}

export default LandingPage;