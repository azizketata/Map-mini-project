import "./App.css";
import * as React from "react";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import { format } from "timeago.js";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

function App() {
  // State variables for managing pins, user inputs, and UI states
  const [pins, setPins] = React.useState([]);
  const [newPlace, setNewPlace] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState(null);
  const [showRegister, setShowRegister] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const [viewPort, setViewPort] = React.useState({
    longitude: 11.598,
    latitude: 48.143,
    zoom: 10.81,
  });
  const [currentPlaceId, setCurrentPlaceId] = React.useState(null);

  // Handle submission of new pin
  const handlePinSubmit = async (e) => {
    e.preventDefault();

    const newPin = {
      userName: currentUser,
      title: title,
      rating: rating,
      desc: desc,
      lat: newPlace.lat,
      lon: newPlace.lng,
    };

    try {
      if (!currentUser) {
        // Handle case where there is no current user
        alert("Please log in to add a pin.");
      } else {
        const response = await axios.post("/pins", newPin);
        setPins([...pins, response.data]);
        setNewPlace(null);
        setRating(1);
        setDesc("");
        setTitle("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Handle double-click to add a new place
  const handleAddClick = (e) => {
    const lat = e.lngLat.lat;
    const lng = e.lngLat.lng;
    setNewPlace({ lat, lng });
  };

  // Handle marker click to show popup
  const handleMarkerClicked = (id) => {
    setCurrentPlaceId(id);
  };

  // Handle user logout
  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Fetch pins data from server on component mount
  React.useEffect(() => {
    const getPins = async () => {
      try {
        const response = await axios.get("/pins");
        setPins(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  return (
    <div>
      {/* Map component with navigation control and markers */}
      <Map
        container={"map"}
        projection={"globe"}
        initialViewState={viewPort}
        mapboxAccessToken={process.env.REACT_APP_TOKEN}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/young-beetle/clwm67fzy00tr01pn6f5u8svw"
        onDblClick={handleAddClick}
      >
        <NavigationControl />
        {pins.map((p) => (
          <React.Fragment key={p._id}>
            {/* Marker for each pin */}
            <Marker longitude={p.lon} latitude={p.lat} anchor="center">
              <LocationOnIcon
                className="icon"
                onClick={() => handleMarkerClicked(p._id)}
                style={{ fontSize: viewPort.zoom * 2, color: "slateblue" }}
              />
            </Marker>
            {/* Popup for selected pin */}
            {p._id === currentPlaceId && (
              <Popup
                longitude={p.lon}
                latitude={p.lat}
                closeOnClick={false}
                closeOnMove={false}
                anchor="left"
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="descr">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(
                      <StarIcon className="Star" key={Math.random()} />
                    )}
                  </div>
                  <label>Information</label>
                  <div className="info">
                    <span className="username">
                      Created by <b>{p.username}</b>
                    </span>
                    <span className="date">{format(p.createdAt)}</span>
                  </div>
                </div>
              </Popup>
            )}
          </React.Fragment>
        ))}
        {/* Popup for adding a new place */}
        {newPlace && (
          <Popup
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            closeOnClick={false}
            closeOnMove={false}
            onClose={() => setNewPlace(null)}
            anchor="left"
          >
            <div>
              <form onSubmit={handlePinSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea
                  placeholder="Say something about this place ..."
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button type="submit" className="submitButton">
                  Add Pin!
                </button>
              </form>
            </div>
          </Popup>
        )}
      </Map>

      {/* Footer with login/register buttons or logout button */}
      <div className="footer">
        <div className="footer_down">
          {currentUser ? (
            <button className="button_logout" onClick={handleLogout}>
              Log Out
            </button>
          ) : (
            <div>
              <button
                className="button_login"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
              <button
                className="button_register"
                onClick={() => setShowRegister(true)}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Register and Login components */}
      {showRegister && <Register setShowRegister={setShowRegister} />}
      {showLogin && (
        <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} />
      )}
    </div>
  );
}

export default App;
