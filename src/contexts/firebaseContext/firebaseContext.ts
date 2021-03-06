import * as React from "react";
import ConfigFirebase from '../../config/firebaseConfig'
export enum UserRole{
    ADMIN = 'admin',
    USER = 'user',
    HELPER = 'helper'
}
export interface DBUser{
    name: string;
    email: string;
    role: UserRole;
    photoURL: string;
    // interest: string[];
    finishInfo: boolean;
    kycData: KYCData;
}
export interface KYCData{
    salutation: string;
    knowOfConference: string;
    supportOrganization: string;
    // onlineAds: string;
    advertisement: string;
    otherKnowOfConference: string;

    // interest: string;
    otherInterest: string;
    interestCheckbox:string[]

    agreementOfCollection: boolean;
    agreementOfShow: boolean;
    agreementOfReceiveInformation: boolean;

    firstName: string;
    lastName: string;
    contactEmail: string
    jobTitle: string;
    organization: string;
    contactNumber: string
    areaCode: string;
}
export interface AppContextInterface {
    currentGlobalUser: DBUser | undefined,
    setCurrentGlobalUser: (user: DBUser)=>void,
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
    const [currentUser, setCurrentUser] = React.useState<DBUser| undefined>(undefined)
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


  