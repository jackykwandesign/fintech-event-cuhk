import * as React from "react";
import ConfigFirebase from '../../config/firebaseConfig'
export interface AppContextInterface {
    currentGlobalUser: firebase.User | undefined,
    setCurrentGlobalUser: (user: firebase.User)=>void,
    isSignin: boolean,
    setSignin: (signin: boolean) => void,
    signOut: ()=>void
  }
  
export  const AppContext = React.createContext<AppContextInterface>({
    currentGlobalUser:undefined,
    setCurrentGlobalUser: ()=>{},
    isSignin:false,
    setSignin: ()=>{},
    signOut: ()=>{},
});

export const useAppContext = ():AppContextInterface =>{
    const [currentUser, setCurrentUser] = React.useState<firebase.User | undefined>(undefined)
    const [isSignin, setSignin] = React.useState<boolean>(false)
    return {
        currentGlobalUser:currentUser,
        setCurrentGlobalUser: setCurrentUser,
        isSignin,
        setSignin,
        signOut:()=>{
            ConfigFirebase.auth().signOut()
            localStorage.clear()
            setCurrentUser(undefined)
            setSignin(false)
        }
    }
}


  