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
        <>
            <h1>Chatroom</h1>
            <iframe src={`https://minnit.chat/FintechConference?embed&&language=en&nickname=${isSignin && currentGlobalUser.name}`} style={{border:"none", width:1400, height:500}} allowTransparency="true"></iframe>
            <br/>
            {/* <a href="https://minnit.chat/FintechConference" target="_blank">Free HTML5 Chatroom powered by Minnit Chat</a> */}
        </>
  
            
        
    )
}


      {/* <div dangerouslySetInnerHTML={getChatroomHTML()}/> */}
    {/* <div  style={{width:"100%",height:"1000px"}}>
      <iframe class="tlkio" src="http://embed.tlk.io/2020CUHKFintechConference-AI" style={{width:"100%",height:"1000px", border:"none"}}></iframe>
    </div> */}
        {/* <div id="tlkio" data-channel="2020CUHKFintechConference-AI" data-nickname={isSignin && currentGlobalUser.name} data-theme="theme--day" style={{width:"100%",height:"1000px"}}></div> */}
            
            {/* {
                isSignin && currentGlobalUser && currentGlobalUser.name != "" &&
                <div id="tlkio" data-channel="2020CUHKFintechConference-AI" data-theme="theme--day" data-nickname={currentGlobalUser.name} style={{width:"100%",height:"1000px"}}></div>
                // currentGlobalUser && 
                // <div id="tlkio" data-channel="2020CUHKFintechConference-AI" data-theme="theme--day" style={{width:"100%",height:"1000px"}}></div>
            } */}