import { Button, withStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts/firebaseContext/firebaseContext';
// import {ColorButton} from '../NavBar/navbar'
import styles from './landingPage.module.css'




const LandingPage = () =>{
  const StyledButton = withStyles({
    root: {
      color:'white',
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
  const {isSignin} = useContext(AppContext)
  const history = useHistory()
  return (
    <div className={styles.hero_container + " " + styles.backdrop}>
      <div className={styles.hero_btns}>
       
       {
        isSignin ? 
          <StyledButton  variant="outlined" size="large"  color="primary" onClick={()=>history.push("/home")}>
            GET STARTED
          </StyledButton >  
        :
          <StyledButton  variant="outlined" size="large"  color="primary" onClick={()=>history.push("/register")}>
            LOGIN / SIGNUP
          </StyledButton >   
      }
    
       

      </div>
    </div>
  );
}

export default LandingPage;