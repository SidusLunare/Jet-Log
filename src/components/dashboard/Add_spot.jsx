import { aircraftTypes, airlines } from "../../data/aircraft_data.js";
import { getCurrentUser, logoutUser } from "../../utils/userstorage.js";
import "../../styles/add-spot.css";
import { useState } from "react";

const Add_spot = () => {
  const [isHovered, setIsHovered] = useState(false);
  const user = getCurrentUser();
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
            </section>
          </section>
        </section>
      </section>
    </>
  );
};

export default Add_spot;
