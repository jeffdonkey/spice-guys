import { useEffect, useState } from "react";

const SpiceDisplay = () => {
  const [spices, setSpices] = useState(null);

  useEffect(() => {
    const fetchSpices = async () => {
      const response = await fetch("http://localhost:5000/api/spices");
      const json = await response.json();

      if (response.ok) {
        setSpices(json);
      }
    };

    fetchSpices();
  }, []);

  return (
    <div className="spice-container">
      <h2>List of spices</h2>
      <button>Add New Spice (Link or Button)</button>{" "} {/* will link to CreatSpicePage.js */}
      <div className="spices-to-cards">
        The individual spice cards will render below
        {spices && spices.map((spice) => <p key={spice._id}>{spice.name}</p>)}
      </div>
    </div>
  );
};

export default SpiceDisplay;