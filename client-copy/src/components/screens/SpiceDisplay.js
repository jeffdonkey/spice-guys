import { useEffect, useState } from "react";

const SpiceDisplay = () => {
  const [spices, setSpices] = useState([]);

  useEffect(() => {
    const fetchSpices = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/spices");
        if (response.ok) {
          const json = await response.json();
          setSpices(json);
        } else {
          throw new Error("Failed to fetch spices");
        }
      } catch (error) {
        console.error(error);
        setSpices([]);
      }
    };

    fetchSpices();
  }, []);

  return (
    <div className="spice-container">
      <h2>List of spices</h2>
      <button>Add New Spice (Link or Button)</button>{" "}
      <div className="spices-to-cards">
        <h3>The individual spice cards will render below</h3>
        {spices?.map((spice) => (
          <p key={spice._id}>{spice.name}</p>
        ))}
      </div>
    </div>
  );
};

export default SpiceDisplay;