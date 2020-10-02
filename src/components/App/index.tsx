import React, { useEffect, useState } from "react";
import {
BrowserRouter as Router,
Switch,
Route,
// useLocation 
} from "react-router-dom";
import HomePage from '../HomePage/home'
import Register from '../Register'
import {Navbar} from "../NavBar/navbar";
import './app.css'
import { Banner } from "../Banner/banner";
import { createMuiTheme, MuiThemeProvider, StylesProvider } from "@material-ui/core/styles";
import firebase from '../../config/firebaseConfig';
import { AppContext, useAppContext } from "../../contexts/firebaseContext/firebaseContext";
import Webinar from "../Webinar/webinar";


function App() {
  const appContext = useAppContext()
return (
<div className="app-container">
<AppContext.Provider value={appContext}>
  <Router>
  <Navbar />
    <Switch>
      <Route exact path="/"></Route>
      <Route>
        <Banner />
      </Route>
    </Switch>

    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/webinar">
        <Webinar />
      </Route>

    </Switch>
  </Router>
  </AppContext.Provider>

  
</div>

);
}

export default App;