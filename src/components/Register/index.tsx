import * as React from 'react';
// import { Component } from 'react';
import { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useHistory } from 'react-router-dom';
import firebase from '../../config/firebaseConfig';

const SignInScreen = (props:any) => {
  const successUrl = '/'
  const [isSignedIn, setSignin] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<any>(undefined)
  // const [jsonResult, setJsonResult] = useState(undefined)
  let history = useHistory();
  useEffect(()=>{

    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      
      async(user) => {
        if(user){
          console.log("registerAuthObserver")
          user.getIdToken(/* forceRefresh */ true)
          .then(async function(idToken) {
            console.log("set firebaseToken")
            localStorage.setItem('firebaseToken',idToken);
            setCurrentUser(user)
            setSignin(true)
          }).catch(async function(error) {
            console.error(error)
          });
        }
      }
    );
    return unregisterAuthObserver;
  },[1])

  function checkLoginOrSigninWithAuthResult(authResult: any, redirectUrl: any):boolean{
    console.log("signin success With Auth callback", authResult)
    // window.location.href = "/dashboard"
    return false
  }

  useEffect(()=>{
    if(isSignedIn === true){
      console.log("IS signin useEffect, can redirect here if user enter /signin link")
      // return history.push(successUrl)
      console.log("currentUser",currentUser)
    }
  },[isSignedIn])

  const uiConfig = {
    signInFlow: firebase.auth().isSignInWithEmailLink(window.location.href) ? 'redirect' : 'popup',
    // signInSuccessWithAuthResult: checkLoginOrSigninWithAuthResult,
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: checkLoginOrSigninWithAuthResult
    },
    // signInSuccess: checkLoginOrSignin,
    // callbacks:{
    //   // signInSuccess: checkLoginOrSignin,
    //   signInSuccessWithAuthResult: checkLoginOrSigninWithAuthResult
    // },
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // signInSuccessUrl: 'http://localhost:8080/api/v1/auth/login',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        // requireDisplayName:true,
      }
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
  };
  function handleSignout(){
    localStorage.clear()
    firebase.auth().signOut()
    setSignin(false)
  }
  if(!isSignedIn){
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    )
  }else{
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome {currentUser?.displayName}! You are now signed-in!</p>
        {/* <p>CurrentUser: {this.state.currentUser}</p> */}
        <button onClick={() => handleSignout()}>Sign-out</button><br/>
        {/* <button onClick={() => handleGetUserInfo()}>Get User Info</button><br/>
        <button onClick={() => handleGetUserSettings()}>Get User Settings</button><br/>
        <button onClick={() => handleGetUser()}>Get Current User</button><br/>
        <button onClick={() => handleCreateBitGoAddress()}>Creaet BitGo Address</button> */}
        {/* <ReactJson src={jsonResult} collapsed={false}/> */}
      </div>
    )
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