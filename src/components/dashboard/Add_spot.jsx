import { aircraftTypes, airlines } from "../../data/aircraft_data.js";
import {
  addSpot,
  getCurrentUser,
  logoutUser,
} from "../../utils/userstorage.js";
import "../../styles/add-spot.css";
import { useState, useRef } from "react";
import Select from "react-select";
import { useNavigate } from "react-router";

const Add_spot = () => {
  const formRef = useRef(null);
  let navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState({
    registration: "",
  });
  const [locationData, setLocationData] = useState({ location: "" });
  const [dateData, setDateData] = useState({ date: "" });
  const [isHovered, setIsHovered] = useState(false);
  const [valueAircraftFilter, setValueAircraftFilter] = useState({
    value: "NoFilter",
    label: "All Types",
  });
  const [valueAirlineFilter, setValueAirlineFilter] = useState({
    value: "NoFilter",
    label: "All Airlines",
  });
  const user = getCurrentUser();

  //dropdown functions

  const AircraftTypesList = aircraftTypes.map((aircraftType) => ({
    value: aircraftType.value,
    label: aircraftType.label,
  }));
  const AirlinesList = airlines.map((airline) => ({
    value: airline.value,
    label: airline.label,
  }));

  const aircraftTypeHandler = (option) => {
    setValueAircraftFilter({
      value: option.value,
      label: option.label,
    });
  };

  const aircraftTypeValue = () => {
    AircraftTypesList.find((type) => type.value === valueAircraftFilter);
  };

  const airlinesHandler = (option) => {
    setValueAirlineFilter({
      value: option.value,
      label: option.label,
    });
  };

  const airlinesValue = () => {
    AirlinesList.find((airline) => airline.value === valueAirlineFilter);
  };

  //form functions

  const registrationNumHandler = (e) => {
    setRegistrationData(e.target.value);
    console.log(e.target.value);
  };

  const locationHandler = (e) => {
    setLocationData(e.target.value);
    console.log(e.target.value);
  };

  const dateHandler = (e) => {
    setDateData(e.target.value);
    console.log(e.target.value);
  };

  const handleExternalClick = () => {
    formRef.current?.requestSubmit();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSpot = {
      aircraftType: valueAircraftFilter,
      registration: registrationData,
      airline: valueAirlineFilter,
      location: locationData,
      date: dateData,
    };
    console.log("Sending to addSpot:", newSpot);
    addSpot(newSpot);
    navigate("/dashboard");
  };
  return (
    <>
      <section className="add-spot">
        <nav className="add-spot__navbar">
          <section className="add-spot__navbar__logo">
            <img
              className="add-spot__navbar__logo__image"
              src="/plane_icon.svg"
              alt="jet log logo"
            />
            <h1 className="add-spot__navbar__logo__text">Jet Log</h1>
          </section>
          <section className="add-spot__navbar__profile">
            <h1 className="add-spot__navbar__profile__text">{user.username}</h1>
            <img
              className="add-spot__navbar__profile__image"
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
        <section className="add-spot__main">
          <section className="add-spot__main__content">
            <section className="add-spot__main__content__infobar">
              <p>New plane spot</p>
              <section className="add-spot__main__content__infobar__buttons">
                <button
                  onClick={handleExternalClick}
                  className="add-spot__main__content__infobar__buttons__save-button"
                >
                  <p>Save</p>
                </button>
                <img
                  className="add-spot__main__content__infobar__buttons__back-button"
                  src="/arrow_back.svg"
                  alt="back arrow"
                />
              </section>
            </section>
          </section>
          <form
            ref={formRef}
            className="add-spot__main__form"
            onSubmit={handleSubmit}
          >
            <label htmlFor="aircraftType">Aircraft Type</label>
            <Select
              name="aircraftType"
              id="aircraftType"
              unstyled
              placeholder="Please select type"
              value={aircraftTypeValue()}
              onChange={aircraftTypeHandler}
              options={aircraftTypes}
              isSearchable={false}
              className="add-spot__main__form__dropdown"
              classNamePrefix="add-spot__main__form__dropdown"
              required
            />
            <label htmlFor="registration">Aircraft registration number</label>
            <input
              type="text"
              name="registration"
              id="registration"
              placeholder="Reg. number..."
              onChange={registrationNumHandler}
              required
            />
            <label htmlFor="airline">Airline</label>
            <Select
              name="airline"
              id="airline"
              unstyled
              placeholder="All Airlines"
              value={airlinesValue()}
              onChange={airlinesHandler}
              options={airlines}
              isSearchable={false}
              className="add-spot__main__form__dropdown"
              classNamePrefix="add-spot__main__form__dropdown"
              required
            />
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              onChange={locationHandler}
              placeholder="Input location..."
              required
            />
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              onChange={dateHandler}
              required
            />
          </form>
        </section>
      </section>
    </>
  );
};

export default Add_spot;
