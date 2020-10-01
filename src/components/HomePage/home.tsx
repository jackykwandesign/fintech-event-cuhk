import { Button, makeStyles, styled, TextField, withStyles } from '@material-ui/core';

import React, { useMemo } from 'react';
// import {ColorButton} from '../NavBar/navbar'
import styles from './home.module.css'

// const ContextStore = React.createContext({
//     products: [],
//     orders: [],
//     firebase: Object,
//     loadWebinar: ()=>{

//     }
// })

// const StartButton = styled(Button)({
    
//     color: '#fff !important',
//     borderColor:'#fff !important',
//     // fontSize:'1rem',
//     // backgroundColor: 'transparent',
//     // transition:'all 0.3s ease-out',
//     // '&:hover': {
//     //   backgroundColor:'white',
//     //   color: 'black'
//     // },

// })
// const StyledButton = withStyles({
//   root:{
//     // borderColor:'white',
//     border:'1px solid rgba(0, 0, 0, 0.23)',
//     transition:'all 0.3s ease-out',
//     '&:hover': {
//       backgroundColor:'#fff ',
//       color: 'black '
//     },
//   },
//   label:{
//     color: 'white'
//   }
// })(Button);





const HomePage = () =>{
  const StyledButton = withStyles({
    root: {
      borderColor:'white',
      color:'white',
      // border:'1px solid rgba(0, 0, 0, 0.23)',
      transition:'all 0.3s ease-out',
      '&:hover': {
        backgroundColor:'#fff ',
        color: 'black ',
        borderColor:'white',
      },
    },
    // label: {
    //   textTransform: 'capitalize',
    // },
  })(Button);
  
  const useStyles = makeStyles({
    root:{
      borderColor:'white',
      color:'white',
      // border:'1px solid rgba(0, 0, 0, 0.23)',

      transition:'all 0.3s ease-out',
      '&:hover': {
        borderColor:'white',
        backgroundColor:'#fff',
        color: 'black ',
        
      },
    },
  });

  return (
    <div className={styles.hero_container}>
    {/* <video src='/videos/cuhk-ie2020.mp4' autoPlay loop muted /> */}
    <img src="/images/backdrop.png" className={styles.backdrop}></img>
    {/* <h1>CUHK FINTECH CONFERENCE 2020</h1>
    <p>What are you waiting for?</p> */}
    <div className={styles.hero_btns}>
      <StyledButton   variant="outlined" size="large"  color="primary">
        GET STARTED
      </StyledButton >

  
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
  );
}

export default HomePage;