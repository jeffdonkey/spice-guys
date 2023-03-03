import image from "../images/mixed.png";
import "./LandingPage.css";

function LandingPage() {
  return (
    <main>
      <h1>🌿 Spice Guys 🌿</h1>
      <div>
        <img src={image} alt="spices" />
        <div>
          <h2>Spice Guys is a spice shop that catalogs a variety of spices and herbs!
            <p>Log In or Sign Up to see more!</p>
          </h2>
        </div>
      </div>
    </main>
  );
}


export default LandingPage;