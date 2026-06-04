import { aircraftTypes, airlines } from "../../data/aircraft_data.js";
import { useNavigate, useLocation } from "react-router";
import Select from "react-select";
import { useState, useEffect, useRef } from "react";

import {
  getCurrentUser,
  logoutUser,
  loadFilters,
  saveFilters,
} from "../../utils/userstorage.js";
import Spotcards from "../cards/Spotcards.jsx";

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

const Dashboard = () => {
  const tempText = "835.093";
  let navigate = useNavigate();
  const location = useLocation();
  const [totalSpotted, setTotalSpotted] = useState(9463663);
  const [totalUniqueAircraft, setTotalUniqueAircraft] = useState(4574);
  const [totalUniqueAirlines, setTotalUniqueAirlines] = useState(835);
  const [mostSpottedAircraft, setMostSpottedAircraft] = useState(1853672);
  const [mostSpottedAirline, setMostSpottedAirline] = useState(735156);
  const [searchTerm, setSearchTerm] = useState("");
  const [valueAircraftFilter, setValueAircraftFilter] = useState({
    value: "NoFilter",
    label: "All Types",
  });
  const [valueAirlineFilter, setValueAirlineFilter] = useState({
    value: "NoFilter",
    label: "All Airlines",
  });
  const [isHovered, setIsHovered] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const isLoadedRef = useRef(false);

  // user stuff

  const user = getCurrentUser();

  // Load filters from localStorage on mount and when returning to dashboard
  useEffect(() => {
    const savedFilters = loadFilters();
    if (savedFilters) {
      // Only load search term on initial mount, not on navigation
      if (!isLoadedRef.current) {
        setSearchTerm(savedFilters.search || "");
      }

      // Look up aircraft filter label
      if (savedFilters.aircraft !== "NoFilter") {
        const found = aircraftTypes.find(
          (a) => a.value === savedFilters.aircraft,
        );
        if (found) {
          setValueAircraftFilter({
            value: found.value,
            label: found.label,
          });
        }
      }

      // Look up airline filter label
      if (savedFilters.airline !== "NoFilter") {
        const found = airlines.find((a) => a.value === savedFilters.airline);
        if (found) {
          setValueAirlineFilter({
            value: found.value,
            label: found.label,
          });
        }
      }

      // Load sort field and direction
      if (savedFilters.sortField) {
        setSortField(savedFilters.sortField);
      }
      if (savedFilters.sortDirection) {
        setSortDirection(savedFilters.sortDirection);
      }
    }
    isLoadedRef.current = true;
  }, [location.pathname]);

  // Save filters to localStorage whenever they change (but not on initial load)
  useEffect(() => {
    if (isLoadedRef.current) {
      saveFilters(
        searchTerm,
        valueAircraftFilter.value,
        valueAirlineFilter.value,
        sortField,
        sortDirection,
      );
    }
  }, [
    searchTerm,
    valueAircraftFilter,
    valueAirlineFilter,
    sortField,
    sortDirection,
  ]);

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

  const handleSearch = (e) => {
    console.log(`search: ${e.target.value}`);
    setSearchTerm(e.target.value);
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

  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if clicking same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field, start with ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortArrow = ({ field }) => {
    if (sortField !== field) return null;
    return (
      <img
        src="/arrow_back.svg"
        alt="sort"
        style={{
          width: "16px",
          height: "16px",
          marginLeft: "12px",
          transform:
            sortDirection === "asc" ? "rotate(-90deg)" : "rotate(90deg)",
          display: "inline-block",
        }}
      />
    );
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
                onChange={handleSearch}
                value={searchTerm}
                placeholder="Type to search..."
              />
            </div>
            <div className="dashboard__main__filterbar__container__buttons">
              <h1 className="dashboard__main__filterbar__container__buttons__text">
                Types
              </h1>
              <Select
                unstyled
                placeholder="All Types"
                value={valueAircraftFilter}
                onChange={aircraftTypeHandler}
                options={aircraftTypes}
                isSearchable={false}
                components={{ DropdownIndicator: CustomDropdownIndicator }}
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
                placeholder="All Airlines"
                value={valueAirlineFilter}
                onChange={airlinesHandler}
                options={airlines}
                isSearchable={false}
                components={{ DropdownIndicator: CustomDropdownIndicator }}
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
            <p
              className="dashboard__main__content__infobar__aircraft-information"
              onClick={() => handleSort("aircraft")}
              style={{ cursor: "pointer" }}
            >
              Aircraft information
              <SortArrow field="aircraft" />
            </p>
            <p
              className="dashboard__main__content__infobar__airline"
              onClick={() => handleSort("airline")}
              style={{ cursor: "pointer" }}
            >
              Airline
              <SortArrow field="airline" />
            </p>
            <p
              className="dashboard__main__content__infobar__location"
              onClick={() => handleSort("location")}
              style={{ cursor: "pointer" }}
            >
              Location
              <SortArrow field="location" />
            </p>
            <p
              className="dashboard__main__content__infobar__date"
              onClick={() => handleSort("date")}
              style={{ cursor: "pointer" }}
            >
              Date added
              <SortArrow field="date" />
            </p>
            <p className="dashboard__main__content__infobar__actions">
              Actions
            </p>
          </section>
          <section className="dashboard__main__content__spotcards">
            <Spotcards
              searchTerm={searchTerm}
              aircraftFilter={valueAircraftFilter}
              airlineFilter={valueAirlineFilter}
              sortField={sortField}
              sortDirection={sortDirection}
            />
          </section>
        </section>
        <section className="dashboard__main__statistics">
          <div className="dashboard__main__statistics__global">
            <h1>Global statistics</h1>
            <div>
              <p>Total spotted aircraft</p>{" "}
              <p>{totalSpotted.toLocaleString("de-DE")}x</p>
            </div>
            <div>
              <p>Total unique aircraft types</p>{" "}
              <p>{totalUniqueAircraft.toLocaleString("de-DE")}x</p>
            </div>
            <div>
              <p>Total unique airlines</p>{" "}
              <p>{totalUniqueAirlines.toLocaleString("de-DE")}x</p>
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
