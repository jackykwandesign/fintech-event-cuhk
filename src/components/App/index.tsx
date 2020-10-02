import React, { useContext, useEffect, useState } from "react";
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

const WithContextApp =() =>{
  const appContext = useAppContext()
  return (
  <AppContext.Provider value={appContext}>
    <App></App>
  </AppContext.Provider>
  )
}

function App() {
  const { setCurrentGlobalUser, setSignin} = useContext(AppContext)
  useEffect(()=>{

    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      
      async(user) => {
        if(user){
          user.getIdToken(/* forceRefresh */ true)
          .then(async function(idToken) {
            setCurrentGlobalUser(user)
            setSignin(true)
          }).catch(async function(error) {
          });
        }
      }
    );
    return unregisterAuthObserver;
  },[1])
return (
<div className="app-container">

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
</div>

);
}

export default WithContextApp;