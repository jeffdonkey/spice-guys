import image from "./images/spice_background.jpg";

function Home() {
  return (
    <main>
      <h1>HOME</h1>
      <div>
        <img height="500" width="800" src={image} alt="spices" />
        <div>
          Photo by <a href="AUTHOR_LINK">Tiard Schulz</a> on <a href="UNSPLASH_LINK">Unsplash</a>
        </div>
      </div>
    </main>
  );
}

export default Home;



