import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider, AuthContext } from "./firebase/auth";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Volunteer from "./Components/Volunteer";
import Login from "./Components/Login";
import List from "./Components/List";
import HelpedList from "./Components/HelpedList";
import Profile from "./Components/Profile";
import Locate from "./Components/Locate";
import NotFound from "./Components/NotFound";
import Nearme from "./Components/Nearme";
import Footer from "./Components/Footer";
import firebase from "./firebase/base";
// import { lastDayOfDecade } from "date-fns";

function App() {
  // const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then((val) => {
      setFirebaseInitialized(val);
    });
  });
  return (
    // firebaseInitialized !== false ?
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {firebase.getCurrentUsername() !== null ? <Profile /> : <Home />}
        </Route>

        <Route path="/volunteer">
          <Volunteer />
        </Route>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>

        <Route path="/locate">
          <Locate />
        </Route>

        <Route path="/nearme">
          <Nearme />
        </Route>

        <Route path="/list">
          <List />
        </Route>

        <Route path="/helpedlist">
          <HelpedList />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
    // ) : (
    //   <div>Loading...</div>
  );
}

export default App;
