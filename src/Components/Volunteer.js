import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import firebase from "../firebase/base";
import { withRouter } from "react-router-dom";
import Fade from "react-reveal/Fade";

import Geocode from "react-geocode";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const Volunteer = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [phone, setPhone] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");
  const [cityerror, setCityerror] = useState("");
  const [staterror, setStaterror] = useState("");
  const [pcerror, setPcerror] = useState("");
  const [phonerror, setPhonerror] = useState("");
  const [capacityerror, setCapacityerror] = useState("");
  const service = true;
  const cityerr = () => {
    if (document.getElementById("city").validity.patternMismatch) {
      setCityerror("is-invalid");
    } else {
      setCityerror("");
    }
  };
  const staterr = () => {
    if (document.getElementById("state").validity.patternMismatch) {
      setStaterror("is-invalid");
    } else {
      setStaterror("");
    }
  };
  // const pcerr = () => {
  //   if (document.getElementById("postalcode").validity.patternMismatch) {
  //     setPcerror("is-invalid");
  //   } else {
  //     setPcerror("");
  //   }
  // };
  const phonerr = () => {
    if (document.getElementById("phone").validity.patternMismatch) {
      setPhonerror("is-invalid");
    } else {
      setPhonerror("");
    }
  };
  const capacityerr = () => {
    if (document.getElementById("capacity").validity.patternMismatch) {
      setCapacityerror("is-invalid");
    } else {
      setCapacityerror("");
    }
  };

  async function onRegister() {
    try {
      await firebase.register(name, email, password);
      await firebase.addUser(
        name,
        email,
        address,
        city,
        state,
        postalcode,
        phone,
        capacity,
        lat,
        long,
        service,
        description
      );
      const templateId = "template_csh6s6k";
      sendFeedback(templateId, {
        message:
          "Welcome to Shelterize!!! Thank you for joining for such great cause!",
        to_name: name,
        from_name: "Shelterize",
        reply_to: email,
      });
      history.replace("/login");
    } catch (error) {
      alert(error.message);
    }
  }

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setlat(latLng.lat);
    setlong(latLng.lng);
    console.log(latLng);
  };

  function sendFeedback(templateId, variables) {
    window.emailjs
      .send("service_3e25s0a", templateId, variables)
      .then((res) => {
        console.log("Email successfully sent!");
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((err) =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  }

  function Locate() {
    Geocode.setApiKey("AIzaSyCj8AF7m9QXW0untu-KF-DZA2oCjXK7NHM");
    Geocode.setLanguage("en");
    return (
      <button
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log(
                position.coords.latitude + "  " + position.coords.longitude
              );

              Geocode.fromLatLng(
                position.coords.latitude,
                position.coords.longitude
              ).then(
                (response) => {
                  const address1 = response.results[0].formatted_address;
                  setAddress(address1);
                  console.log(address1);
                },
                (error) => {
                  console.error(error);
                }
              );
              setlat(position.coords.latitude);
              setlong(position.coords.longitude);
            },
            () => null
          );
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

  return (
    <>
      <Header currUser={null} />
      <section className="banner-area relative" id="home">
        <div className="overlay overlay-bg"></div>
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="about-content col-lg-12">
              <h1 className="text-white">Registeration Form</h1>
              <p className="text-white link-nav">
                <a href="/">Home </a>{" "}
                <span className="lnr lnr-arrow-right"></span>{" "}
                <a href="/volunteer"> Become a Volunteer</a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="Volunteer-form-area section-gap">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="menu-content pb-60 col-lg-9">
              <div className="title text-center">
                <h1 className="mb-20">Want to help?</h1>
                <p>
                  Nothing is as satisfying as watching a homeless person having
                  home and food. If you want to help us in providing them home,
                  Feel free to become our volunteer.
                </p>
                <p className="grey-text text-darken-1">
                  Already have an account? <a href="/login">Login</a>
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <form
              className="col-lg-9"
              action="/profile"
              onSubmit={(e) => e.preventDefault() && false}
            >
              <div className="form-group">
                <label for="first-name">Name of the organisation</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
              </div>
              <div class="form-row">
                <div class="col-6 mb-30">
                  <label for="email">Email-Id</label>
                  <div class="select-option" id="service-select">
                    <input
                      type="email"
                      placeholder="Official Email-id"
                      class="form-control"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <div class="col-6 mb-30">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    class="form-control"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <br />
              <hr />
              <div className="form-group">
                {/* <AutoSearch /> */}
                <label for="Address">Address</label>
                {/* <input
                  type="text"
                  className="form-control mb-20"
                  placeholder="Your Address"
                  required
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                /> */}
                <PlacesAutocomplete
                  value={address}
                  onChange={setAddress}
                  onSelect={handleSelect}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      {/* <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p> */}

                      <input
                        type="text"
                        className="form-control mb-20"
                        {...getInputProps({ placeholder: "Type address" })}
                      />

                      <div>
                        {loading ? <div>...loading</div> : null}

                        {suggestions.map((suggestion) => {
                          const style = {
                            backgroundColor: suggestion.active
                              ? "#41b6e6"
                              : "#fff",
                          };

                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, { style })}
                            >
                              {suggestion.description}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
                <Locate />
              </div>
              <div class="form-row">
                <div class="col-6 mb-30">
                  <label for="City">City</label>
                  <div class="select-option" id="service-select">
                    <input
                      type="text"
                      id="city"
                      pattern="^\D*$"
                      placeholder="City"
                      className="form-control"
                      required
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        cityerr(city);
                      }}
                    />
                    <Fade bottom collapse when={cityerror}>
                      <div
                        className="invalid-feedback"
                        style={{ display: "block" }}
                      >
                        City can not have a no.
                      </div>
                    </Fade>
                  </div>
                </div>
                <div class="col-6 mb-30">
                  <label for="state">State</label>
                  <div class="select-option" id="service-select">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="State"
                      id="state"
                      pattern="^\D*$"
                      required
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value);
                        staterr(state);
                      }}
                    />
                    <Fade bottom collapse when={staterror}>
                      <div
                        className="invalid-feedback"
                        style={{ display: "block" }}
                      >
                        City can not have a no.
                      </div>
                    </Fade>
                  </div>
                </div>
                <div class="col-6 mb-30">
                  <label for="postal-code">Postal code</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Postal Code"
                    // id="postalcode"
                    // pattern="^\W+$"
                    required
                    value={postalcode}
                    onChange={(e) => {
                      setPostalcode(e.target.value);
                      // pcerr(postalcode);
                    }}
                  />
                  {/* <Fade bottom collapse when={pcerror}>
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      City can not have a no.
                    </div>
                  </Fade> */}
                </div>
              </div>
              <br />
              <hr style={{ depth: "20px", color: "black" }} />
              <div className="form-group">
                <label for="first-name">Proof of the organisation</label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="eg- (Address Proof etc.)"
                />
              </div>
              <div className="form-row">
                <div class="col-6 mb-30">
                  <label for="phone no.">Offical Phone no.</label>
                  <input
                    type="phone"
                    placeholder="Phone no."
                    class="form-control"
                    required
                    id="phone"
                    pattern="^((\+){1}91){1}[1-9]{1}[0-9]{9}$"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      phonerr(phone);
                    }}
                  />
                  <Fade bottom collapse when={phonerror}>
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      City can not have a no.
                    </div>
                  </Fade>
                </div>
                <div class="col-6 mb-30">
                  <label for="capacity">Capacity</label>
                  <input
                    type="number"
                    id="capacity"
                    pattern="^\W\w*$"
                    placeholder="Capacity of people willing to take in"
                    class="form-control"
                    required
                    value={capacity}
                    onChange={(e) => {
                      setCapacity(e.target.value);
                      capacityerr(capacity);
                    }}
                  />
                  <Fade bottom collapse when={capacityerror}>
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      City can not have a no.
                    </div>
                  </Fade>
                </div>
              </div>

              {/* <fieldset className="form-group">
            <label for="day"></label>
                          <div className="form-group ">
                              <div className="form-check form-check-inline">
                                  <label className="form-check-label">
                                      <input className="form-check-input" type="checkbox" name="inlinecheckbox" id="inlineRadio1" value="option1"/> Monday
                                  </label>
                              </div>
                              <div className="form-check form-check-inline">
                                  <label className="form-check-label">
                                      <input className="form-check-input" type="checkbox" name="inlinecheckbox" id="inlineRadio2" value="option2"/> Tuesday
                                  </label>
                              </div>
                              <div className="form-check form-check-inline">
                                  <label className="form-check-label">
                                      <input className="form-check-input" type="checkbox" name="inlinecheckbox" id="inlineRadio3" value="option3"/> Wednesday
                                  </label>
                              </div>
                              <div className="form-check form-check-inline">
                                  <label className="form-check-label">
                                      <input className="form-check-input" type="checkbox" name="inlinecheckbox" id="inlineRadio2" value="option4"/> Thursday
                                  </label>
                              </div>
                              <div className="form-check form-check-inline">
                                  <label className="form-check-label">
                                      <input className="form-check-input" type="checkbox" name="inlinecheckbox" id="inlineRadio2" value="option5"/> Friday
                                  </label>
                              </div>
                              <div className="form-check form-check-inline">
                                  <label className="form-check-label">
                                      <input className="form-check-input" type="checkbox" name="inlinecheckbox" id="inlineRadio2" value="option6"/> Saturday
                                  </label>
                              </div>
                              <div className="form-check form-check-inline">
                                  <label className="form-check-label">
                                      <input className="form-check-input" type="checkbox" name="inlinecheckbox" id="inlineRadio2" value="option6"/> Sunday
                                  </label>
                              </div>
                          </div>
            </fieldset> */}

              <div className="form-group">
                <label for="note">Description of the organisation</label>
                <textarea
                  className="form-control"
                  id="exampleTextarea"
                  rows="5"
                  required
                  value={description}
                  placeholder="Write message"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </div>
              <button
                type="submit"
                onClick={onRegister}
                className="primary-btn float-right"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default withRouter(Volunteer);
