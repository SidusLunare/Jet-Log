import { useState, useEffect } from "react";
import {
  getSpottedList,
  removeSpot,
  saveFavourites,
} from "../../utils/userstorage.js";
import { useNavigate } from "react-router";

const Spotcards = ({
  searchTerm = "",
  aircraftFilter = {},
  airlineFilter = {},
  sortField = null,
  sortDirection = "asc",
  onSpotsChange = () => {},
}) => {
  const [spots, setSpots] = useState([]);
  const [confirmedIds, setConfirmedIds] = useState({});
  const [removingIds, setRemovingIds] = useState({});

  let navigate = useNavigate();
  useEffect(() => {
    setSpots(getSpottedList());
  }, []);

  // Filter spots based on search and dropdown filters
  const filteredSpots = spots.filter((spot) => {
    const matchesAircraft =
      aircraftFilter.value === "NoFilter" ||
      aircraftFilter.value === undefined ||
      spot.aircraftType.value === aircraftFilter.value;

    const matchesAirline =
      airlineFilter.value === "NoFilter" ||
      airlineFilter.value === undefined ||
      spot.airline.value === airlineFilter.value;

    const matchesSearch =
      searchTerm === "" ||
      spot.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spot.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesAircraft && matchesAirline && matchesSearch;
  });

  // Sort the filtered spots
  const sortedSpots = [...filteredSpots].sort((a, b) => {
    if (a.favourited && !b.favourited) return -1;
    if (!a.favourited && b.favourited) return 1;
    if (!sortField) return 0;

    let aVal, bVal;

    switch (sortField) {
      case "aircraft":
        aVal = a.aircraftType.label || "";
        bVal = b.aircraftType.label || "";
        break;
      case "airline":
        aVal = a.airline.label || "";
        bVal = b.airline.label || "";
        break;
      case "location":
        aVal = a.location || "";
        bVal = b.location || "";
        break;
      case "date":
        aVal = new Date(a.date) || new Date(0);
        bVal = new Date(b.date) || new Date(0);
        break;
      default:
        return 0;
    }

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const favouriteItem = (spotId) => {
    saveFavourites(spotId);
    setSpots(getSpottedList());
    onSpotsChange();
  };

  const handleRemove = (id) => {
    if (!confirmedIds[id]) {
      setConfirmedIds((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setConfirmedIds((prev) => ({ ...prev, [id]: false }));
      }, 5000);
    } else {
      setRemovingIds((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        removeSpot(id);
        setSpots(getSpottedList());
        setConfirmedIds((prev) => ({ ...prev, [id]: false }));
        onSpotsChange();
      }, 2000);
    }
  };

  return (
    <>
      {sortedSpots.length === 0 && (
        <p className="dashboard__main__content__spotcards__nospot-card">
          No spots yet.
        </p>
      )}
      {sortedSpots.map((spot) => (
        <section
          key={spot.id}
          className={
            spot.favourited
              ? "dashboard__main__content__spotcards__card dashboard__main__content__spotcards__card--favourite"
              : "dashboard__main__content__spotcards__card"
          }
        >
          {removingIds[spot.id] ? (
            <p className="dashboard__main__content__spotcards__card--removed">
              Removed successfully
            </p>
          ) : (
            <>
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
                  className="dashboard__main__content__spotcards__card__actions__favourite"
                  onClick={() => favouriteItem(spot.id)}
                >
                  {spot.favourited == false ? "Favourite" : "Unfavourite"}
                </button>
                <section className="dashboard__main__content__spotcards__card__actions__edit-remove">
                  <button
                    onClick={() => {
                      navigate(`/dashboard/edit-spot/${spot.id}`);
                      console.log(`Navigate to edit spot with ID: ${spot.id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleRemove(spot.id)}>
                    {confirmedIds[spot.id] ? "Are you Sure?" : "Remove"}
                  </button>
                </section>
              </div>
            </>
          )}
        </section>
      ))}
    </>
  );
};

export default Spotcards;
