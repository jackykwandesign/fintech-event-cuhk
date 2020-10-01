import { makeStyles, MuiThemeProvider, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import { purple } from '@material-ui/core/colors';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import React, { useState, useEffect } from 'react';
// import { Button } from './Button';
import { Link } from 'react-router-dom';
import './navbar.css';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));
// const theme = createMuiTheme({
//   palette: {
//     // primary: {
//     //   main: '#fff',
//     //   contrastText: "#fff"
//     // },
    
//   },
//   // overrides:{
//   //   MuiButton:{
//   //     outlinedPrimary:{
//   //       // main:'#fff',
//   //       color:'#fff',
//   //       borderColor:'#fff',
//   //       // contrastText: "#fff"
//   //     }
//   //   }
//   // }
// });
export const ColorButton = withStyles((theme) => ({
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

export function Navbar() {
const [click, setClick] = useState(false);
const [button, setButton] = useState(true);

const handleClick = () => setClick(!click);
const closeMobileMenu = () => setClick(false);

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
          CUHK FinTech
          <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars' } />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu' }>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/infomation' className='nav-links' onClick={closeMobileMenu}>
              Information
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/webinar' className='nav-links' onClick={closeMobileMenu}>
              Webinar
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/project' className='nav-links' onClick={closeMobileMenu}>
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
              Sign Up
              </Link>
            </li>
          </ul>
        </div>
        {
            button &&
            <>
              <Link to="/register" className="nav-buttons">
                <ColorButton variant="outlined" className={classes.margin} >
                  Sign Up
                </ColorButton>
              </Link>
              <Link to="/login" className="nav-buttons">
                <ColorButton variant="outlined" className={classes.margin} >
                  Login
                </ColorButton>
              </Link>

            </>
          }
      </nav>
    {/* </MuiThemeProvider> */}
  </>
  );
  }

