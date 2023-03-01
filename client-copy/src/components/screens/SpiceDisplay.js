import { useEffect, useState } from "react";
import axios from "axios";

const SpiceDetails = () => {
  const [spices, setSpices] = useState([]);
  const [selectedSpice, setSelectedSpice] = useState(null);

  useEffect(() => {
    const fetchSpices = async () => {
      const response = await axios.get("http://localhost:5000/api/spices");
      setSpices(response.data);
    };

    fetchSpices();
  }, []);

  const handleSpiceClick = async (id) => {
    const response = await axios.get(`http://localhost:5000/api/spices/${id}`);
    setSelectedSpice(response.data);
  };

  return (
    <div className="spice-container">
      <h2>List of spices</h2>
      <button>Add New Spice (Link or Button)</button>{" "}
      {/* will link to CreatSpicePage.js */}
      <div className="spices-to-cards">
        {/* Render individual spice cards */}
        {spices.map((spice) => (
          <div key={spice._id} onClick={() => handleSpiceClick(spice._id)}>
            <h3>{spice.name}</h3>
            <p>{spice.tagline}</p>
          </div>
        ))}
      </div>

      {/* Render selected spice information in a popup? */}
      {selectedSpice && (
        <div>
          <h3>{selectedSpice.name}</h3>
          <img src={selectedSpice.image} alt={selectedSpice.name} />
          <p>{selectedSpice.tagline}</p>
          <p>{selectedSpice.description}</p>
        </div>
      )}
    </div>
  );
};

export default SpiceDetails;
