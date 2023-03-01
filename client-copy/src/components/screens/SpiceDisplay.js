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
      <div className="spices">
        {spices && spices.map((spice) => <p key={spice._id}>{spice.name}</p>)}
      </div>
    </div>
  );
};

export default SpiceDisplay;