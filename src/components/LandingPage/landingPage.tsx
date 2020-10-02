import { Button, withStyles } from '@material-ui/core';
import {Link} from 'react-router-dom'
import React from 'react';
// import {ColorButton} from '../NavBar/navbar'
import styles from './landingPage.module.css'




const LandingPage = () =>{
  const StyledButton = withStyles({
    root: {
      // borderColor:'white',
      color:'white',
      // maxWidth: '30px', 
      // maxHeight: '30px', 
      // minWidth: '250px', 
      // minHeight: '100px',
      fontSize:"2rem",
      border:'3px solid white',
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
  

  return (
    <div className={styles.hero_container + " " + styles.backdrop}>
      <div className={styles.hero_btns}>
       
          <StyledButton  variant="outlined" size="large"  color="primary" href="/home">
            GET STARTED
          </StyledButton >       
       

      </div>
    </div>
  );
}

export default LandingPage;