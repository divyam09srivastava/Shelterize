import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from "./Loading";
//import { AuthContext } from "../firebase/auth";
import firebase from "../firebase/base";
import { withRouter } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";

const libraries = ["places"];
const mapContainerStyle = {
  height: "35vh",
  width: "50vw",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 28.7162,
  lng: 77.1171,
};

const Profile = ({ history }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCj8AF7m9QXW0untu-KF-DZA2oCjXK7NHM",
    libraries,
  });
  const currUser = firebase.getCurrentUsername();
  const [userdetail, setUserdetail] = useState([null]);

  var data;
  // var cen;
  useEffect(() => {
    const fetchdata = async () => {
      await firebase.db
        .collection("users")
        .where("email", "==", `${currUser}`)
        .get()
        .then((querySnapshot) => {
          data = querySnapshot.docs.map((doc) => doc.data());
          // console.log("data: " + data[0].name);
          setUserdetail(data);

          // console.log(userdetail[0].name);
        });
    };
    fetchdata();
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  const onUpdate = () => {
    const db = firebase.db;
    db.collection("users")
      .doc(userdetail[0].uid.toString())
      .set({ ...userdetail[0], service: false });
  };
  const onUpdate2 = () => {
    const db = firebase.db;
    db.collection("users")
      .doc(userdetail[0].uid.toString())
      .set({ ...userdetail[0], service: true });
  };

  function Locate({}) {
    return (
      <button
        // className="locate"
        onClick={() => {
          mapRef.current.panTo(userdetail[0].lat, userdetail[0].long);
          mapRef.current.setZoom(20);
        }}
      >
        <img
          src="https://cdn.iconscout.com/icon/free/png-256/compass-62-93840.png"
          alt="compass"
          style={{ width: "50px", height: "50px" }}
        />
      </button>
    );
  }

  return userdetail !== null ? (
    <>
      <Header />
      <section className="banner-area relative" id="home">
        <div className="overlay overlay-bg"></div>
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="about-content col-lg-12">
              <h1 className="text-white">Profile</h1>
              <p className="text-white link-nav">
                <a href="/">Home </a>{" "}
                <span className="lnr lnr-arrow-right"></span>{" "}
                <a href="/volunteer">Profile</a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="Volunteer-form-area section-gap">
        <div
          className="container"
          style={{ backgroundColor: "black", opacity: "0.7", color: "white" }}
        >
          <div className="row justify-content-center">
            <form
              className="col-lg-8"
              onSubmit={(e) => e.preventDefault() && false}
            >
              <div className="form-group">
                <br />
                <br />
                <label
                  for="first-name"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  Name of the organisation
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={
                    userdetail[0] == null ? "First Name" : userdetail[0].name
                  }
                />
              </div>
              <div class="form-row">
                <div class="col-6 mb-30">
                  <label
                    for="email"
                    style={{ color: "white", fontSize: "20px" }}
                  >
                    Email-Id
                  </label>
                  <div class="select-option" id="service-select">
                    <input
                      type="email"
                      placeholder="Official Email-id"
                      class="form-control"
                      value={firebase.getCurrentUsername()}
                      required
                    />
                  </div>
                </div>
                <div class="col-6 mb-30">
                  <label
                    for="password"
                    style={{ color: "white", fontSize: "20px" }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    class="form-control"
                  />
                </div>
              </div>
              <br />
              <div className="form-group">
                <label
                  for="Address"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  Address
                </label>
                {/* <input type="text" className="form-control mb-20" placeholder="Your Address" />
              <input type="text" className="form-control" placeholder="Address 2" /> */}
                {/* <Locate /> */}
                <GoogleMap
                  id="map"
                  mapContainerStyle={mapContainerStyle}
                  zoom={8}
                  center={center}
                  options={options}
                  // onClick={onMapClick}
                  onLoad={onMapLoad}
                >
                  {userdetail !== null &&
                  userdetail[0] !== null &&
                  userdetail !== undefined &&
                  userdetail[0] !== undefined ? (
                    <Marker
                      key={userdetail[0].uid}
                      position={{
                        lat: userdetail[0].lat,
                        lng: userdetail[0].long,
                      }}
                      // onClick={() => {
                      //   setSelected(marker);
                      // }}
                      icon={{
                        url: `https://www.svgrepo.com/show/21602/home-with-a-heart.svg`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(30, 30),
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </GoogleMap>
              </div>
              <div class="form-row">
                <div class="col-6 mb-30">
                  <label
                    for="City"
                    style={{ color: "white", fontSize: "20px" }}
                  >
                    City
                  </label>
                  <div class="select-option" id="service-select">
                    <input
                      type="text"
                      placeholder="City"
                      class="form-control"
                      value={
                        userdetail[0] == null ? "City" : userdetail[0].city
                      }
                      required
                    />
                  </div>
                </div>
                <div class="col-6 mb-30">
                  <label
                    for="state"
                    style={{ color: "white", fontSize: "20px" }}
                  >
                    State
                  </label>
                  <div class="select-option" id="service-select">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="State"
                      value={
                        userdetail[0] == null ? "State" : userdetail[0].state
                      }
                      required
                    />
                  </div>
                </div>
                <div class="col-6 mb-30">
                  <label
                    for="postal-code"
                    style={{ color: "white", fontSize: "20px" }}
                  >
                    Postal code
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Postal Code"
                    value={
                      userdetail[0] == null
                        ? "Postal Code"
                        : userdetail[0].postalcode
                    }
                    required
                  />
                </div>
              </div>
              <br />
              <div className="form-row">
                <div class="col-6 mb-30">
                  <label
                    for="phone no."
                    style={{ color: "white", fontSize: "20px" }}
                  >
                    Offical Phone no.
                  </label>
                  <input
                    type="phone"
                    placeholder="Phone no."
                    class="form-control"
                    value={
                      userdetail[0] == null ? "Phone no." : userdetail[0].phone
                    }
                    required
                  />
                </div>
                <div class="col-6 mb-30">
                  <label
                    for="capacity"
                    style={{ color: "white", fontSize: "20px" }}
                  >
                    Capacity
                  </label>
                  <input
                    type="number"
                    placeholder="Capacity of people willing to take in"
                    class="form-control"
                    value={
                      userdetail[0] == null
                        ? "Capacity"
                        : userdetail[0].capacity
                    }
                    required
                  />
                </div>
              </div>

              {userdetail[0] !== null && userdetail[0] !== undefined ? (
                userdetail[0].service === true ? (
                  <button type="submit" onClick={onUpdate} className="form-btn">
                    Stop Services
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={onUpdate2}
                    className="form-btn-green"
                  >
                    Restart Services
                  </button>
                )
              ) : (
                <></>
              )}
              <button
                onClick={() => {
                  history.push("/list");
                }}
                className="primary-btn float-right"
              >
                {" "}
                Move to list{" "}
              </button>
              <br />
              <br />
            </form>
          </div>
          <br />
        </div>
      </section>
      <Footer />
    </>
  ) : (
    <div className="container">
      <div className="row justify-content-center">
        <Container />
      </div>
    </div>
  );
};
export default withRouter(Profile);
