import { useState } from "react";
import axios from "axios";

const CreateSpicePage = () => {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/spices", {
        name,
        tagline,
        image,
        description,
      });
      console.log(response.data);
      setError("");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Create a new spice</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="tagline">Tagline:</label>
          <input
            type="text"
            id="tagline"
            value={tagline}
            onChange={(event) => setTagline(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
        <button type="submit">Create</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateSpicePage;
