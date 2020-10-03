import { Avatar, makeStyles, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import React, { useState, useEffect, useContext } from 'react';
// import { Button } from './Button';
import { Link } from 'react-router-dom';
import { AppContext } from '../../contexts/firebaseContext/firebaseContext';
import './navbar.css';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));



export function Navbar() {
  const ColorButton = withStyles((theme) => ({
    root: {
      color: '#fff',
      borderColor:'#fff',
      // fontSize:'1rem',
      backgroundColor: 'transparent',
      transition:'all 0.3s ease-out',
      '&:hover': {
        backgroundColor:'#fff',
        color: 'black'
      },
    },
  }))(Button);
const [click, setClick] = useState(false);
const [button, setButton] = useState(true);

const handleClick = () => setClick(!click);
const closeMobileMenu = () => setClick(false);

const { signOut, isSignin, currentGlobalUser} = useContext(AppContext)

const showButton = () => {
if (window.innerWidth <= 1024) { setButton(false); } else { setButton(true); } }; useEffect(()=> {
  showButton();
  }, []);

  window.addEventListener('resize', showButton);


  const classes = useStyles();
  return (

  <>
    {/* <MuiThemeProvider theme={theme}> */}
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          {/* 2020 CUHK CONFERENCE ON FINANCIAL TECHNOLOGY */}
          CUHK FINTECH CONFERENCE 2020
          {/* <i className='fab fa-typo3' /> */}
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars' } />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu' }>
            <li className='nav-item'>
              <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
              Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/information' className='nav-links' onClick={closeMobileMenu}>
              Information
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/webinar' className='nav-links' onClick={closeMobileMenu}>
              Webinar
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/projectDemo' className='nav-links' onClick={closeMobileMenu}>
              Project Demo
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/chatroom' className='nav-links' onClick={closeMobileMenu}>
              ChatRoom
              </Link>
            </li>

            <li>
              <Link to='/register' className='nav-links-mobile' onClick={closeMobileMenu}>
              Login / Sign Up
              </Link>
            </li>

          </ul>
          
            {
              button && !isSignin &&
              <div className="nav-button-container">
              <Link to="/register" className="nav-buttons">
                <ColorButton variant="outlined" className={classes.margin}>
                  Login / Sign Up
                </ColorButton>
              </Link>
              </div>
            }
          
          {
            button && isSignin &&
            <div className="nav-button-container active">
              <Avatar src={currentGlobalUser?.photoURL ? currentGlobalUser?.photoURL : "/images/avatar.png"} />
              <span>{currentGlobalUser?.displayName ? currentGlobalUser.displayName : "Guest"}</span>
              <Link to="/" className="nav-buttons">
                <ColorButton variant="outlined" className={classes.margin} onClick={signOut}>
                  SignOut
                </ColorButton>
              </Link>
            </div>
            }
        </div>

      </nav>
  </>
  );
  }

