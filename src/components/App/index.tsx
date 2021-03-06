import React, { useContext, useEffect, useState} from "react";
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
import WebinarList from "../Admin/WebinarList/webinarList"
import ProjectDemoDetail from "../ProjectDemo/projectDemoDetail/projectDemoDetail";
import { initChat, toogleChat } from "./test";
import ParticipantDetail from "../MeetOtherParticipant/participantDetail";
import { Chatroom } from "../Chatroom/chatroom";
import { updateLastLoginTime } from "../../service/participant";
// import { FillinfoResult } from "../FillInfo/fillInfo-result";

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
  const [oldLink, setOldLink] = useState<string>("")
  const [startChat, setStartChat] = useState<boolean>(false)
  const [firstTime, setFirstTime]= useState<boolean>(true)
  useEffect(()=>{
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      
      async(user) => {
        setOldLink(window.location.pathname)
        // console.log("oldLink", oldLink)
        if(user){
          
          user.getIdToken(/* forceRefresh */ true)
          .then(async function(idToken) {
            await localStorage.setItem('firebaseToken', idToken)
            const res = await validateUser()
            // console.log()
            if(res){
              setCurrentGlobalUser(res)
              if(res.role === UserRole.ADMIN){
                // console.log("IS ADMIN")
                return setSignin(true)
              }else if(res.role === UserRole.HELPER){
                // console.log("IS HELPER")
                return setSignin(true)
              }else if(res.finishInfo){
                // console.log("IS USER, FINISH INFO")
                
                return setSignin(true)
                // return reInitChatFunction()
                 
              }else{
                // console.log("IS USER, NOT FINISH INFO")
              }
            }
          }).catch(async function(error) {
          });
        }
      }
    );
    return unregisterAuthObserver;
  },[setCurrentGlobalUser,setSignin])

  // useEffect(()=>{
  //   setOldLink(window.location.pathname)
  //   console.log("oldLink", oldLink)
  // },[])
  useEffect(()=>{
    // console.log("init chat")
    
    isSignin && initChat(`${currentGlobalUser?.name}, ${currentGlobalUser?.kycData.jobTitle}@${currentGlobalUser?.kycData.organization}`,currentGlobalUser?.email) && setStartChat(true)
    // startChat && !isSignin && toogleChat()
    
  },[isSignin])

  const updateLoginTime = async()=>{
    const intervalId = setInterval(async () => { 
      const res = await updateLastLoginTime()
    },5000)
    
  }
  useEffect(() => {
    const interval = setInterval(async () => {
      await updateLastLoginTime()
      console.log("update per 600 sec")
    }, 600000);
    return () => clearInterval(interval);
  }, []);
  // useEffect(()=>{
  //   console.log("per 5 sec")
  //   const intervalId = setInterval(async () => { 
  //     // const res = await updateLastLoginTime()
  //     console.log("per 5 sec")
  //   },5000)
  //   return clearInterval(intervalId);
  // },[])
return (
<div className="app-container">

  <Router>
  <Navbar />
  <div className="content-container">

    <div style={{maxWidth:"1400px"}}>
    <Switch>
      <Route exact path="/2020fintech/"></Route>
      <Route path="/2020fintech/admin/"></Route>
      <Route>
        <Banner />
      </Route>
    </Switch>
    </div>
    {/* style={{borderLeft:"1px solid black",maxWidth:"1400px"}} */}
    <div className="content-container" >
    <Switch>

      <Route exact path="/2020fintech/">
        <LandingPage />
      </Route>
      
      <Route path="/2020fintech/home">
        <HomePage />
      </Route>     

      <Route path="/2020fintech/register">
        <Register />
      </Route>
      
      <Route path="/2020fintech/information">
        <Information />
      </Route>  

      <Route path="/2020fintech/webinar">
        <Webinar />
      </Route>

      <Route path="/2020fintech/projectDemo">
        <ProjectDemo />
      </Route>
      <Route path="/2020fintech/projectDemoDetail">
        <ProjectDemoDetail />
      </Route>

      <Route path="/2020fintech/meetOtherParticipant">
        <ParticipantDetail />
      </Route>  

      <Route path="/2020fintech/chatroom">
        <Chatroom />
      </Route>      
      
      <Route path="/2020fintech/fillInfo">
      {/* <FillInfo /> */}
          {currentGlobalUser && !isSignin ? <FillInfo /> : <Redirect to="/2020fintech/" /> }
      </Route>

      <Route path="/2020fintech/admin/userlist">
        {currentGlobalUser && isSignin && (currentGlobalUser.role === UserRole.ADMIN || currentGlobalUser.role === UserRole.HELPER) ?  <UserList /> : <Redirect to="/2020fintech/" />}
      </Route>
      <Route path="/2020fintech/admin/webinarList">
        {currentGlobalUser && isSignin && (currentGlobalUser.role === UserRole.ADMIN || currentGlobalUser.role === UserRole.HELPER) ?  <WebinarList /> : <Redirect to="/2020fintech/" />}
      </Route>

      <Route path="/2020fintech">
        <Redirect to="/2020fintech/"></Redirect>
      </Route>

      <Route>
        <Redirect to="/2020fintech/"></Redirect>
      </Route>
      
    </Switch>
    </div>
    </div>

  </Router>
</div>

);
}

export default WithContextApp;