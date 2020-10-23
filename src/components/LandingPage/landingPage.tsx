import { Button, withStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts/firebaseContext/firebaseContext';
import useWindowDimensions from '../WindowDimension/windowDimension';
// import {ColorButton} from '../NavBar/navbar'
import styles from './landingPage.module.css'




const LandingPage = () =>{
  const StyledButton = withStyles({
    root: {
      color:'white',
      fontSize:"1rem",
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
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
  const { height, width } = useWindowDimensions();
  console.log(`height: ${height}, width: ${width}`)
  return (
    
    <div className={styles.hero_container}>
      {/* <img className = {styles.bgimg} src = "/images/backdrop.png"></img> */}
      {
        width >= 1024 ? <img className = {styles.bgimg} src = "/images/backdrop.png"></img> : <img className = {styles.bgimg} src = "/images/backdrop-vertical.png"></img>
      }
      
      <div className={styles.hero_btns}>
       
       {
        isSignin ? 
        <StyledButton  variant="outlined" size="large"  color="primary" onClick={()=>history.push("/2020fintech/")}>
        COMING SOON
      </StyledButton >  
          // <StyledButton  variant="outlined" size="large"  color="primary" onClick={()=>history.push("/home")}>
          //   GET STARTED
          // </StyledButton >  
        :
          <StyledButton  variant="outlined" size="large"  color="primary" onClick={()=>history.push("/2020fintech/register")}>
            LOGIN / SIGNUP
          </StyledButton >   
      }
    
       

      </div>
    </div>
  );
}

export default LandingPage;