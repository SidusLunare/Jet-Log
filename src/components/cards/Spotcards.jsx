import { useState, useEffect } from "react";
import { getSpottedList } from "../../utils/userstorage.js";
import "../../styles/Dashboard.css";

const Spotcards = () => {   
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    setSpots(getSpottedList());
  }, []);

  const handleRemove = (id) => {
    removeSpot(id);
    setSpots((prev) => prev.filter((spot) => spot.id !== id));
  };

  return (
    <>
      {spots.length === 0 && <p>No spots yet.</p>}
      {spots.map((spot) => (
        <section key={spot.id} className="dashboard__main__content__card">
          <div className="dashboard__main__content__card__title">
            <h1>{spot.aircraftType.label || spot.aircraftType}</h1>
            <h3>Registration number: {spot.registration}</h3>
          </div>
          <p>{spot.airline.label || spot.airline}</p>
          <p>{spot.location}</p>
          <p>{spot.date}</p>
          <div className="dashboard__main__content__card__buttons">
            <button>WIP</button>
            <button onClick={() => handleRemove(spot.id)}>Remove</button>
          </div>
        </section>
      ))}
    </>
  );
};

export default Spotcards;
