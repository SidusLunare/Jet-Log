import { aircraftTypes, airlines } from "../../data/aircraft_data.js";
import { useNavigate } from "react-router";
import Select from "react-select";
import "../../styles/Dashboard.css";
import { useState, useEffect, useCallback } from "react";
import { getCurrentUser, logoutUser } from "../../utils/userstorage.js";

const Dashboard = () => {
  const tempText = "835.093";
  let navigate = useNavigate();
  const [totalSpotted, setTotalSpotted] = useState(9463663);
  const [totalUniqueAircraft, setTotalUniqueAircraft] = useState(4574);
  const [totalUniqueAirlines, setTotalUniqueAirlines] = useState(835);
  const [mostSpottedAircraft, setMostSpottedAircraft] = useState(1853672);
  const [mostSpottedAirline, setMostSpottedAirline] = useState(735156);
  const [valueAircraftFilter, setValueAircraftFilter] = useState({
    value: "NoFilter",
    label: "All Types",
  });
  const [valueAirlineFilter, setValueAirlineFilter] = useState({
    value: "NoFilter",
    label: "All Airlines",
  });
  const [isHovered, setIsHovered] = useState(false);

  // user stuff

  const user = getCurrentUser();

  // global statistics number generator
  useEffect(() => {
    const id = setInterval(() => {
      // generate your random increment
      const randomInt = Math.random() * 3 * Math.random() * 3;
      const totalSpottedDelta = Math.floor(randomInt * 1000);
      const totalUniqueAircraftDelta = Math.floor(randomInt * 0.35);
      const totalUniqueAirlinesDelta = Math.floor(randomInt * 0.35);
      const MostSpottedAircraftDelta = Math.floor(randomInt * 35);
      const MostSpottedAirlineDelta = Math.floor(randomInt * 20);
      // functional updater makes sure you always add to the latest value
      setTotalSpotted((prev) => prev + totalSpottedDelta);
      setTotalUniqueAircraft((prev) => prev + totalUniqueAircraftDelta);
      setTotalUniqueAirlines((prev) => prev + totalUniqueAirlinesDelta);
      setMostSpottedAircraft((prev) => prev + MostSpottedAircraftDelta);
      setMostSpottedAirline((prev) => prev + MostSpottedAirlineDelta);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  //dropdown functions

  const AircraftTypesList = aircraftTypes.map((aircraftType) => ({
    value: aircraftType.value,
    label: aircraftType.label,
  }));
  const AirlinesList = airlines.map((airline) => ({
    value: airline.value,
    label: airline.label,
  }));

  const aircraftTypeHandler = () => {};

  const aircraftTypeValue = () => {
    AircraftTypesList.find((type) => type.value === valueAircraftFilter);
  };

  const airlinesHandler = () => {};

  const airlinesValue = () => {
    AirlinesList.find((airline) => airline.value === valueAirlineFilter);
  };

  return (
    <section className="dashboard">
      <nav className="dashboard__navbar">
        <section className="dashboard__navbar__logo">
          <img
            className="dashboard__navbar__logo__image"
            src="/plane_icon.svg"
            alt="jet log logo"
          />
          <h1 className="dashboard__navbar__logo__text">Jet Log</h1>
        </section>
        <section className="dashboard__navbar__profile">
          <h1 className="dashboard__navbar__profile__text">{user.username}</h1>
          <img
            className="dashboard__navbar__profile__image"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              logoutUser;
              navigate("/auth/login");
            }}
            src={isHovered ? "/log-out.svg" : "/account_picture.svg"}
            alt="account picture"
          />
        </section>
      </nav>
      <section className="dashboard__main">
        <section className="dashboard__main__filterbar">
          <section className="dashboard__main__filterbar__container">
            <div className="dashboard__main__filterbar__container__buttons">
              <h1 className="dashboard__main__filterbar__container__buttons__text">
                Search
              </h1>
              <input
                className="dashboard__main__filterbar__container__buttons__input"
                type="search"
                name="Search"
                id="searchbar"
                placeholder="Type to search..."
              />
            </div>
            <div className="dashboard__main__filterbar__container__buttons">
              <h1 className="dashboard__main__filterbar__container__buttons__text">
                Types
              </h1>
              <Select
                unstyled
                placeholder="All Airlines"
                value={aircraftTypeValue()}
                onChange={aircraftTypeHandler()}
                options={aircraftTypes}
                isSearchable={false}
                className="dashboard__main__filterbar__container__buttons__dropdown"
                classNamePrefix="dashboard__main__filterbar__container__buttons__dropdown"
              />
            </div>
            <div className="dashboard__main__filterbar__container__buttons">
              <h1 className="dashboard__main__filterbar__container__buttons__text">
                Airlines
              </h1>
              <Select
                unstyled
                placeholder="All Types"
                value={airlinesValue()}
                onChange={airlinesHandler()}
                options={airlines}
                isSearchable={false}
                className="dashboard__main__filterbar__container__buttons__dropdown"
                classNamePrefix="dashboard__main__filterbar__container__buttons__dropdown"
              />
            </div>
          </section>
          <div
            className="dashboard__main__filterbar__button"
            onClick={() => {
              navigate("/dashboard/add-spot");
            }}
          >
            <p>Add new spot</p>
          </div>
        </section>
        <section className="dashboard__main__content">
          <section className="dashboard__main__content__infobar">
            <p>Aircraft information</p>
            <p>Airline</p>
            <p>Location</p>
            <p>Date added</p>
            <p>Actions</p>
          </section>
        </section>
        <section className="dashboard__main__statistics">
          <div className="dashboard__main__statistics__global">
            <h1>Global statistics</h1>
            <div>
              <p>Total spotted aircraft</p>{" "}
              <p>{totalSpotted.toLocaleString("de-DE")}</p>
            </div>
            <div>
              <p>Total unique aircraft types</p>{" "}
              <p>{totalUniqueAircraft.toLocaleString("de-DE")}</p>
            </div>
            <div>
              <p>Total unique airlines</p>{" "}
              <p>{totalUniqueAirlines.toLocaleString("de-DE")}</p>
            </div>
            <div>
              <p>Most spotted aircraft type</p>{" "}
              <p>
                Airbus A320-200 ({mostSpottedAircraft.toLocaleString("de-DE")}x)
              </p>
            </div>
            <div>
              <p>Most spotted airline</p>{" "}
              <p>
                Turkish Airlines ({mostSpottedAirline.toLocaleString("de-DE")}x)
              </p>
            </div>
          </div>
          <div className="dashboard__main__statistics__local">
            <h1>Local statistics</h1>
            <div>
              <p>Total spotted aircraft</p> <p>{tempText}</p>
            </div>
            <div>
              <p>Total unique aircraft types</p> <p>{tempText}</p>
            </div>
            <div>
              <p>Total unique airlines</p> <p>{tempText}</p>
            </div>
            <div>
              <p>Most spotted aircraft type</p> <p>{tempText}</p>
            </div>
            <div>
              <p>Most spotted airline</p> <p>{tempText}</p>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Dashboard;
