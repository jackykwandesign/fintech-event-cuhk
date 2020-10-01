import React, { useState } from "react";
import {
BrowserRouter as Router,
Switch,
Route,
// useLocation 
} from "react-router-dom";
import HomePage from '../HomePage/home'
import Register from '../Register'
import Login from '../Login'
import {Navbar} from "../NavBar/navbar";
import './app.css'
import { Banner } from "../Banner/banner";
import { createMuiTheme, MuiThemeProvider, StylesProvider } from "@material-ui/core/styles";
function App() {
  // const location = useLocation();
  const [isRoot, setIsRoot] = useState<boolean>(false)

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#000',
        
      },
      
    },
    
  });

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

      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  </Router>
 
  {/* </MuiThemeProvider> */}
  {/* </StylesProvider> */}
  
</div>

);
}

export default App;