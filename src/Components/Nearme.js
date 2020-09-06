import React, { useEffect } from "react";
import Container from "./Loading";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";

import "./nearme.css";

// import { formatRelative } from "date-fns";
import firebase from "../firebase/base";
import { Link } from "react-router-dom";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

// const center = {
//   lat: 28.7162,
//   lng: 77.1171,
// };

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    // googleMapsApiKey: "AIzaSyBPF9Ms5bLeYdvB8IU5ny8gfion_JmyrD0",
    // googleMapsApiKey: "AIzaSyBCO7fqvr8Uzl-GSJgZDA4Lzb1nrw6Yx7o",
    googleMapsApiKey: "AIzaSyCj8AF7m9QXW0untu-KF-DZA2oCjXK7NHM",
    // googleMapsApiKey: "AIzaSyCq-GMlFPxSi4Hlw6-8pttvoPb8WFLoON4",
    //AIzaSyCj8AF7m9QXW0untu-KF-DZA2oCjXK7NHM
    //AIzaSyCq-GMlFPxSi4Hlw6-8pttvoPb8WFLoON4
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [curlocation, setCurlocation] = React.useState([
    { lat: 28.7162, lng: 77.1171 },
  ]);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurlocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  } else {
    console.log("not possible");
  }
  // const [userdetail, setUserdetail] = useState([null]);
  function Locate({ panTo }) {
    return (
      <button
        className="locate"
        onClick={() => {
          console.log("working");
          // navigator.geolocation.getCurrentPosition(
          //   (position) => {
          //     console.log(
          //       position.coords.latitude + "  " + position.coords.longitude
          //     );
          panTo({
            lat: curlocation.lat,
            lng: curlocation.lng,
          });
          //    },
          //     () =>  null
          //   );
        }}
      >
        <img
          src="https://cdn.iconscout.com/icon/free/png-256/compass-62-93840.png"
          alt="My Curent location"
          style={{ width: "50px", height: "50px" }}
        />
      </button>
    );
  }
  var data;
  useEffect(() => {
    // firebase.db
    //   .collection("users")
    //   .get()
    //   .then((querySnapshot) => {
    //     data = querySnapshot.docs.map((doc) => doc.data());
    //     // console.log("data: " + data[0].name);
    //     setMarkers(data);
    //   });
    const fetchdata = async () => {
      await firebase.db
        .collection("users")
        .where("service", "==", true)
        .get()
        .then((querySnapshot) => {
          data = querySnapshot.docs.map((doc) => doc.data());
          // console.log("data: " + data[0].name);
          setMarkers(data);

          // console.log(userdetail[0].name);
        });
    };
    fetchdata();
  }, []);

  // const onMapClick = React.useCallback((e) => {
  //   setMarkers((current) => [
  //     ...current,
  //     {
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //       time: new Date(),
  //     },
  //   ]);
  // }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.setZoom(16);
    mapRef.current.panTo({ lat, lng });
  }, []);

  if (loadError) return "Error";
  if (!isLoaded)
    return (
      <div className="container">
        <div className="row d-flex align-items-center justify-content-center">
          <Container />
        </div>
      </div>
    );

  return (
    <div>
      <a href="/">
        <h1 className="h1near">Shelterize </h1>
      </a>

      <Locate panTo={panTo} />
      {/* <Search panTo={panTo} /> */}

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={{ lat: curlocation.lat, lng: curlocation.lng }}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {/* {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.long }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: `https://www.svgrepo.com/show/21602/home-with-a-heart.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))} */}
        <Marker
          position={{ lat: curlocation.lat, lng: curlocation.lng }}
          icon={{
            url: `https://www.svgrepo.com/show/286488/pin.svg`,
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />
        {markers.map((marker) => (
          <Marker
            key={marker.uid}
            position={{
              lat: marker.lat,
              lng: marker.long,
            }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: `https://www.svgrepo.com/show/21602/home-with-a-heart.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.long }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <span role="img" aria-label="bear">
                  <img
                    src="https://www.svgrepo.com/show/5321/building.svg"
                    style={{ height: "100px", width: "40px" }}
                    alt="shelter"
                  ></img>
                </span>{" "}
                {selected.name}
              </h2>
              <p>
                <span class="lnr lnr-map-marker"></span>
                {"   "}
                {selected.address}
              </p>
              <p>
                <span class="lnr lnr-phone-handset"></span>
                {"   "}
                {selected.phone}
              </p>
              <p>
                <span class="lnr lnr-bubble"></span>
                {"   "}
                {selected.description}
              </p>
              <p>
                <span class="lnr lnr-location"></span>
                {"   "}
                <a
                  href={
                    "https://www.google.com/maps/dir/'" +
                    `${curlocation.lat},` +
                    `${curlocation.lng}'` +
                    `/'${selected.lat},` +
                    `${selected.long}'/`
                  }
                >
                  View on Google Maps
                </a>
              </p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

// function Search({ panTo }) {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 43.6532, lng: () => -79.3832 },
//       radius: 100 * 1000,
//     },
//   });

// https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

//   const handleInput = (e) => {
//     setValue(e.target.value);
//   };

//   const handleSelect = async (address) => {
//     setValue(address, false);
//     clearSuggestions();

//     try {
//       const results = await getGeocode({ address });
//       const { lat, lng } = await getLatLng(results[0]);
//       panTo({ lat, lng });
//     } catch (error) {
//       console.log("😱 Error: ", error);
//     }
//   };

//   return (
//     <div className="search">
//       {/* <Combobox onSelect={handleSelect}>
//         <ComboboxInput
//           value={value}
//           onChange={handleInput}
//           disabled={!ready}
//           placeholder="Search your location"
//         />
//         <ComboboxPopover>
//           <ComboboxList>
//             {status === "OK" &&
//               data.map(({ id, description }) => (
//                 <ComboboxOption key={id} value={description} />
//               ))}
//           </ComboboxList>
//         </ComboboxPopover>
//       </Combobox> */}
//     </div>
//   );
// }
