import React, { useContext } from 'react'
import { AppContext } from '../../contexts/firebaseContext/firebaseContext'

export function Chatroom(props) {
    
    const {currentGlobalUser, isSignin} = useContext(AppContext)
    return (
        // data-nickname={currentGlobalUser.name} 
        <>
        <div id="tlkio" data-channel="2020CUHKFintechConference-AI" data-nickname={isSignin && currentGlobalUser.name} data-theme="theme--day" style={{width:"100%",height:"1000px"}}></div>
            
            {/* {
                isSignin && currentGlobalUser && currentGlobalUser.name != "" &&
                <div id="tlkio" data-channel="2020CUHKFintechConference-AI" data-theme="theme--day" data-nickname={currentGlobalUser.name} style={{width:"100%",height:"1000px"}}></div>
                // currentGlobalUser && 
                // <div id="tlkio" data-channel="2020CUHKFintechConference-AI" data-theme="theme--day" style={{width:"100%",height:"1000px"}}></div>
            } */}
            
        </>
    )
}
