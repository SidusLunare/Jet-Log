import { useState, useEffect } from "react";
import { getSpottedList } from "../../utils/userstorage.js";
import { useNavigate } from "react-router";

const Spotcards = () => {
  const [spots, setSpots] = useState([]);

  let navigate = useNavigate();
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
        <section
          key={spot.id}
          className="dashboard__main__content__spotcards__card"
        >
          <div className="dashboard__main__content__spotcards__card__aircraft-information">
            <h1>{spot.aircraftType.label || spot.aircraftType}</h1>
            <h3>Registration number: {spot.registration}</h3>
          </div>
          <p className="dashboard__main__content__spotcards__card__airline">
            {spot.airline.label || spot.airline}
          </p>
          <p className="dashboard__main__content__spotcards__card__location">
            {spot.location}
          </p>
          <p className="dashboard__main__content__spotcards__card__date">
            {spot.date}
          </p>
          <div className="dashboard__main__content__spotcards__card__actions">
            <button
              onClick={() => {
                navigate(`/dashboard/edit-spot/${spot.id}`);
                console.log(`Navigate to edit spot with ID: ${spot.id}`);
              }}
            >
              Edit
            </button>
            <button onClick={() => handleRemove(spot.id)}>Remove</button>
          </div>
        </section>
      ))}
    </>
  );
};

export default Spotcards;
