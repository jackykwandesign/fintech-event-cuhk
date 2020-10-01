import React, { useState } from "react";
import {
BrowserRouter as Router,
Switch,
Route,
useLocation 
} from "react-router-dom";
import HomePage from '../HomePage/home'
import Register from '../Register'
import Login from '../Login'
import {Navbar} from "../NavBar/navbar";
import './app.css'
import { Banner } from "../Banner/banner";
function App() {
  // const location = useLocation();
  const [isRoot, setIsRoot] = useState<boolean>(false)
return (
<>

  <Router>
    <Navbar />
    {/* load backdrop only when mainpage, else load banner */}
    <Switch>
      <Route exact path="/">

      </Route>
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

      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  </Router>
</>

);
}

export default App;