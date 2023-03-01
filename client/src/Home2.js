import image from "./images/mixed.png";
import "./Home2.css";


function Home2() {
    return (

        <main>
            <h1>Spice Guys 🌿</h1>
            <div>
                <img src={image} alt="spices" />
                <div>
                    <h2>Spice Guys is a spice shop that catalogs a variety of spices and herbs.
                        <p><a href="./Login">Login</a> or <a href="./Register">Register</a> to continue.</p>
                    </h2>

                </div>
            </div>
        </main>

    );
}


export default Home2;