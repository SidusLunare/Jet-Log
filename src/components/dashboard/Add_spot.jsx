import { aircraftTypes, airlines } from "../../data/aircraft_data.js";
import {
  addSpot,
  getCurrentUser,
  logoutUser,
} from "../../utils/userstorage.js";
import { useState, useRef, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router";

// Custom dropdown indicator component
const CustomDropdownIndicator = (props) => (
  <div {...props.innerProps}>
    <img
      src="/dropdown_arrow.svg"
      alt="dropdown"
      style={{ width: "48px", height: "48px" }}
    />
  </div>
);

const Add_spot = () => {
  const formRef = useRef(null);
  let navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const [registrationData, setRegistrationData] = useState("");
  const [locationData, setLocationData] = useState("");
  const [dateData, setDateData] = useState(today);
  const [isHovered, setIsHovered] = useState(false);
  const [valueAircraftFilter, setValueAircraftFilter] = useState({
    value: "NoFilter",
    label: "All Types",
  });
  const [valueAirlineFilter, setValueAirlineFilter] = useState({
    value: "NoFilter",
    label: "All Airlines",
  });
  const [buttonState, setButtonState] = useState(false);
  const user = getCurrentUser();

  // Check button state whenever form fields change
  useEffect(() => {
    if (
      registrationData === "" ||
      locationData === "" ||
      dateData === "" ||
      valueAircraftFilter.value === "NoFilter" ||
      valueAirlineFilter.value === "NoFilter"
    ) {
      setButtonState(false);
    } else {
      setButtonState(true);
    }
  }, [
    registrationData,
    locationData,
    dateData,
    valueAircraftFilter,
    valueAirlineFilter,
  ]);

  //dropdown functions

  const AircraftTypesList = aircraftTypes.map((aircraftType) => ({
    value: aircraftType.value,
    label: aircraftType.label,
  }));
  const AirlinesList = airlines.map((airline) => ({
    value: airline.value,
    label: airline.label,
  }));

  const ButtonStateHandler = () => {
    const off = false;
    const on = true;
    if (
      registrationData === "" ||
      locationData === "" ||
      dateData === "" ||
      valueAircraftFilter.value === "NoFilter" ||
      valueAirlineFilter.value === "NoFilter"
    ) {
      setButtonState(off);
    } else {
      setButtonState(on);
    }
  };

  const aircraftTypeHandler = (option) => {
    setValueAircraftFilter({
      value: option.value,
      label: option.label,
    });
  };

  const airlinesHandler = (option) => {
    setValueAirlineFilter({
      value: option.value,
      label: option.label,
    });
  };

  //form functions

  const registrationNumHandler = (e) => {
    console.log(e.target.value);
    setRegistrationData(e.target.value);
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
                  className={
                    buttonState
                      ? "add-spot__main__content__infobar__buttons__save-button"
                      : "add-spot__main__content__infobar__buttons__save-button--disabled"
                  }
                  disabled={!buttonState}
                >
                  <p>Save</p>
                </button>
                <img
                  className="add-spot__main__content__infobar__buttons__back-button"
                  src="/arrow_back.svg"
                  alt="back arrow"
                  onClick={() => navigate(-1)}
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
              value={valueAircraftFilter}
              onChange={aircraftTypeHandler}
              options={aircraftTypes}
              isSearchable={false}
              components={{ DropdownIndicator: CustomDropdownIndicator }}
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
              value={valueAirlineFilter}
              onChange={airlinesHandler}
              options={airlines}
              isSearchable={false}
              components={{ DropdownIndicator: CustomDropdownIndicator }}
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
              value={dateData}
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
