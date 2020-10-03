import * as React from 'react';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
// import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
// import { Link, useHistory } from 'react-router-dom';
import firebase from '../../config/firebaseConfig';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './register.css'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import './firebaseui-styling.global.css'; // Import globally.
import { StyledFirebaseAuth } from 'react-firebaseui';
import { AppContext } from '../../contexts/firebaseContext/firebaseContext';
import { Redirect, useHistory } from 'react-router-dom';

const SignInScreen = (props:any) => {
const { setCurrentGlobalUser, setSignin, isSignin} = useContext(AppContext)
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
    grid: {
    width: "300px"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));
const classes = useStyles();
  const successUrl = '/'
  // useEffect(()=>{

  //   const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      
  //     async(user) => {
  //       if(user){
  //         // console.log("registerAuthObserver")
  //         user.getIdToken(/* forceRefresh */ true)
  //         .then(async function(idToken) {
  //           // console.log("set firebaseToken")
  //           // localStorage.setItem('firebaseToken',idToken);
  //           setCurrentGlobalUser(user)
  //         }).catch(async function(error) {
  //           // console.error(error)
  //         });
  //       }
  //     }
  //   );
  //   return unregisterAuthObserver;
  // },[1])

  let history = useHistory()
  function checkLoginOrSigninWithAuthResult(authResult: any, redirectUrl: any):boolean{
    console.log("signin success With Auth callback", authResult)
    // setSignin(true)
    // window.location.href = "/dashboard"
    history.push(successUrl)
    return false
  }

  const uiConfig = {
    signInFlow: firebase.auth().isSignInWithEmailLink(window.location.href) ? 'redirect' : 'popup',
    
    callbacks: {
      signInSuccessWithAuthResult: checkLoginOrSigninWithAuthResult
    },
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      },
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,

    ],
  };
  if(!isSignin){
    return (
      <div className="register_container">
        
      <div className={classes.paper}>
      <Avatar className={classes.avatar}>
         <LockOutlinedIcon />
        </Avatar>
       <Typography component="h1" variant="h5">
        Login / Sign up
      </Typography>

      </div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    )
  }else{
    return <Redirect to={successUrl} />
  }



}
  export default  SignInScreen

// import React from 'react';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {`Copyright © ${new Date().getFullYear()}. Powered by Phoennovation Limited`}
//       {/* <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '} */}
//       {}
//       {'.'}
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// const handleRegister = () =>{
//   console.log("hello")
// }
// export default function SignUp() {
//   const classes = useStyles();

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign up
//         </Typography>
//         <form className={classes.form} noValidate>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="displayName"
//                 label="Display Name"
//                 name="displayName"
//                 autoComplete="displayName"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//               />
//             </Grid>
//             {/* <Grid item xs={12}>
//               <FormControlLabel
//                 control={<Checkbox value="allowExtraEmails" color="primary" />}
//                 label="I want to receive inspiration, marketing promotions and updates via email."
//               />
//             </Grid> */}
//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//             onClick={handleRegister}
//           >
//             Sign Up
//           </Button>
//           <Grid container justify="flex-end">
//             <Grid item>
//               <Link href="#" variant="body2">
//                 Already have an account? Sign in
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//       <Box mt={5}>
//         <Copyright />
//       </Box>
//     </Container>
//   );
// }

// // import React from 'react';


// // // const ContextStore = React.createContext({
// // //     products: [],
// // //     orders: [],
// // //     firebase: Object,
// // //     loadWebinar: ()=>{

// // //     }
// // // })
// // const Register = () =>{
// //   return (
// //     <div className="App">
// //         <h1>Register</h1>
// //     </div>
// //   );
// // }

// // export default Register;