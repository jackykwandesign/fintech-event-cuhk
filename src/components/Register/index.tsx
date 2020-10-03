import * as React from 'react';
import { useContext } from 'react';
import firebase from '../../config/firebaseConfig';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './register.css'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import './firebaseui-styling.global.css'; // Import globally.
import { StyledFirebaseAuth } from 'react-firebaseui';
import { AppContext, UserRole } from '../../contexts/firebaseContext/firebaseContext';
import { Redirect, useHistory } from 'react-router-dom';
import { validateUser, registerUser} from '../../service/auth';


const SignInScreen = (props:any) => {
  const { isSignin} = useContext(AppContext)
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

  let history = useHistory()
  async function checkUserRedirect(authResult: any){
    // const {idToken} = authResult.credential
    // await localStorage.setItem('firebaseToken', idToken)
    firebase.auth().currentUser?.getIdToken(true)
    .then(async(token)=>{
      await localStorage.setItem('firebaseToken', token)
      let user;
      user = await validateUser()
      console.log("user", user)
      if(!user){
        console.log("Register User")
        await registerUser()
        user = await validateUser()
      }
      if(user?.role === UserRole.ADMIN){
        history.push(successUrl)
      }else{
        if(user?.finishInfo === false){
          history.push('/fillInfo')
        }else{
          history.push(successUrl)
        }
      }
    })
    // let user;
    // user = await validateUser()
    // console.log("idToken", idToken)
    // // user = await validateUserByToken(accessToken)
    // console.log("user", user)
    // //register user
    // if(!user){
    //   console.log("Register User")
    //   await registerUser()
    //   user = await validateUser()
    // }

    // if(user?.role === UserRole.ADMIN){
    //   history.push(successUrl)
    // }else{
    //   if(user?.finishInfo === false){
    //     history.push('/fillInfo')
    //   }else{
    //     history.push(successUrl)
    //   }
    // }

  }

  function checkLoginOrSigninWithAuthResult(authResult: any, redirectUrl: any):boolean{
    console.log("signin success With Auth callback", authResult)
    // if(authResult){
    //   checkUserRedirect(authResult)
    // }
    console.log("Pass check")
    return false
  }

  const uiConfig = {
    // signInFlow: firebase.auth().isSignInWithEmailLink(window.location.href) ? 'redirect' : 'popup',
    signInFlow : 'popup',
    
    callbacks: {
      // signInSuccessWithAuthResult: checkLoginOrSigninWithAuthResult
      signInSuccessWithAuthResult: ()=> false
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
