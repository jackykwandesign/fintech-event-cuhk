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
function App() {

  // const [isSignedIn, setSignin] = useState<boolean>(false)
  // const [currentUser, setCurrentUser] = useState<any>(undefined)
  // useEffect(()=>{

  //   const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      
  //     async(user) => {
  //       if(user){
  //         console.log("registerAuthObserver")
  //         user.getIdToken(/* forceRefresh */ true)
  //         .then(async function(idToken) {
  //           console.log("set firebaseToken")
  //           localStorage.setItem('firebaseToken',idToken);
  //           setCurrentUser(user)
  //           setSignin(true)
  //         }).catch(async function(error) {
  //           console.error(error)
  //         });
  //       }
  //     }
  //   );
  //   return unregisterAuthObserver;
  // },[1])
  
return (
<div className="app-container">
{/* <StylesProvider injectFirst> */}
{/* <MuiThemeProvider theme={theme}> */}
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

    </Switch>
  </Router>
 
  {/* </MuiThemeProvider> */}
  {/* </StylesProvider> */}
  
</div>

);
}

export default App;