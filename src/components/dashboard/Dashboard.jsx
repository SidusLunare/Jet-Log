import { aircraftTypes, airlines } from "../../data/aircraft_data.js";
import Select from "react-select";

const Dashboard = () => {
  const tempText = "835.093";


  return (
    <>
      <nav>
        <section className="">
          <img className="" src="/plane_icon.svg" alt="jet log logo" />
          <h1 className="">Jet Log</h1>
        </section>
        <section className="">
          <h1 className="">[username]</h1>
          <img className="" src="/account_picture.svg" alt="account picture" />
        </section>
      </nav>
      <section className="">
        <section className="">
          <section className="">
            <div className="">
              <h1 className="">Search</h1>
              <input className="" type="search" name="Search" id="searchbar" />
            </div>
            <div className="">
              <h1 className=""></h1>
              <Select
                // unstyled
                value={""}
                onChange={""}
                options={aircraftTypes}
                isSearchable={false}
                classNamePrefix=""
              />
            </div>
            <div className="">
              <h1 className=""></h1>
              <Select
                // unstyled
                value={""}
                onChange={""}
                options={airlines}
                isSearchable={false}    
                classNamePrefix=""
              />
            </div>
          </section>
          <div className="" onClick={""}>
            <p>Add new spot</p>
          </div>
        </section>
        <section className="">
          <section className="">
            <p>Aircraft information</p>
            <p>Airline</p>
            <p>Location</p>
            <p>Date added</p>
            <p>Actions</p>
          </section>
        </section>
        <section className="">
          <div className="">
            <h1>Global statistics</h1>
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
          <div className="">
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
    </>
  );
};

export default Dashboard;
