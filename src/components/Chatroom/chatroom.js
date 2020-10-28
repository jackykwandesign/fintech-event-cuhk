import React, { useContext } from 'react'
import { AppContext } from '../../contexts/firebaseContext/firebaseContext'

export function Chatroom(props) {
    
    const {currentGlobalUser, isSignin} = useContext(AppContext)
    // const getChatroomHTML = () =>{
    //     // return {__html:<div id="tlkio" data-channel="2020CUHKFintechConference-AI" data-nickname={isSignin && currentGlobalUser.name} data-theme="theme--day" style={{width:"100%",height:"1000px"}}></div>}
    //     return {__html:<a class="tlkio" href="https://embed.tlk.io/2020CUHKFintechConference-AI"/>}
    // }
    // console.log(getChatroomHTML())
    // return <div dangerouslySetInnerHTML={getChatroomHTML()}/>
    return (
        // data-nickname={currentGlobalUser.name} 
        <>
        <h1>Chatroom</h1>
        {/* <div dangerouslySetInnerHTML={getChatroomHTML()}/> */}
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
