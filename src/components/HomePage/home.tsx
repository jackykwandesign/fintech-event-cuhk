import { Button } from '@material-ui/core';
import React from 'react';
import {ColorButton} from '../NavBar/navbar'
import './home.css'

// const ContextStore = React.createContext({
//     products: [],
//     orders: [],
//     firebase: Object,
//     loadWebinar: ()=>{

//     }
// })
const HomePage = () =>{
  return (
    <div className='hero-container'>
    {/* <video src='/videos/cuhk-ie2020.mp4' autoPlay loop muted /> */}
    <img src="/images/backdrop.png"></img>
    {/* <h1>CUHK FINTECH CONFERENCE 2020</h1>
    <p>What are you waiting for?</p> */}
    <div className='hero-btns'>
      <ColorButton
        style={{
          font:"50px"
        }}
      >
        GET STARTED
      </ColorButton>
      {/* <ColorButton
        // className='btns'
        // buttonStyle='btn--primary'
        // buttonSize='btn--large'
        // onClick={console.log('hey')}
      >
        WATCH TRAILER <i className='far fa-play-circle' />
      </ColorButton> */}
    </div>
  </div>
    // <div className="App">
    //     <h1>HomePage</h1>
    // </div>
  );
}

export default HomePage;