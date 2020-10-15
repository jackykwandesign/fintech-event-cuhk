import React, { useContext, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import HomePage from '../HomePage/home'
import Register from '../Register'
import {Navbar} from "../NavBar/navbar";
import { Banner } from "../Banner/banner";
import firebase from '../../config/firebaseConfig';
import { AppContext, useAppContext, UserRole } from "../../contexts/firebaseContext/firebaseContext";
import Webinar from "../Webinar/webinar";
import LandingPage from "../LandingPage/landingPage";
import './app.css'
import { Information } from "../Information/information";
import { ProjectDemo } from "../ProjectDemo/projectDemo";
// import ConfigAxio from '../../config/axioConfig'
import { validateUser } from "../../service/auth";
// import Axios from "axios";
import { FillInfo } from "../FillInfo/fillInfo";
import UserList from "../Admin/UserList/userList";

const WithContextApp =() =>{
  const appContext = useAppContext()
  return (
    <AppContext.Provider value={appContext}>
      <App/>
    </AppContext.Provider>
  )
}

function App() {

  // auto login if token valid
  const { setCurrentGlobalUser, setSignin, isSignin, currentGlobalUser} = useContext(AppContext)
  useEffect(()=>{
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      
      async(user) => {
        if(user){
          user.getIdToken(/* forceRefresh */ true)
          .then(async function(idToken) {
            await localStorage.setItem('firebaseToken', idToken)
            const res = await validateUser()
            console.log()
            if(res){
              setCurrentGlobalUser(res)
              if(res.role === UserRole.ADMIN){
                console.log("IS ADMIN")
                return setSignin(true)
              }else if(res.role === UserRole.HELPER){
                console.log("IS HELPER")
                return setSignin(true)
              }else if(res.finishInfo){
                console.log("IS USER, FINISH INFO")
                return setSignin(true)
              }else{
                console.log("IS USER, NOT FINISH INFO")
              }
            }
          }).catch(async function(error) {
          });
        }
      }
    );
    return unregisterAuthObserver;
  },[setCurrentGlobalUser,setSignin])
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
        <LandingPage />
      </Route>
      <Route path="/home">
        <HomePage />
      </Route>     
      <Route path="/register">
        <Register />
      </Route>
      
      {/* <Route path="/information">
        <Information />
      </Route>  

      <Route path="/webinar">
        <Webinar />
      </Route>
      <Route path="/projectDemo">
        <ProjectDemo />
      </Route> */}
      
      <Route path="/fillInfo">
          {currentGlobalUser && !isSignin ? <FillInfo /> : <Redirect to="/" /> }
      </Route>

      {
        currentGlobalUser && isSignin && (currentGlobalUser.role === UserRole.ADMIN || currentGlobalUser.role === UserRole.HELPER) &&
        <Route path="/admin/userlist">
          <UserList />
        </Route>
      }

      <Route>
        <Redirect to="/"></Redirect>
      </Route>

    </Switch>
  </Router>
</div>

);
}

export default WithContextApp;