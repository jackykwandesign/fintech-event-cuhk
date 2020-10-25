import React, { useContext, useState } from 'react'
import { AppContext } from '../../contexts/firebaseContext/firebaseContext';
import styles from './information.module.css'
export function Information(props) {
    // const [isInit, setIsInit] = useState(false)
    // const {currentGlobalUser} = useContext(AppContext)
    // function initChat(){
    //     window["Mibew"].ChatPopup.init({
    //         "id":"5f945f00dbca991b",
    //         "url":`http:\/\/conference.cintec.cuhk.edu.hk\/mibew\/index.php\/chat?locale=en&name=${currentGlobalUser.name}@${currentGlobalUser.kycData.organization}`,
    //         "preferIFrame":true,
    //         "modSecurity":true,
    //         "forceSecure":false,
    //         "style":"",
    //         "width":640,
    //         "height":480,
    //         "resizable":true,
    //         "styleLoader":"http:\/\/conference.cintec.cuhk.edu.hk\/mibew\/index.php\/chat\/style\/popup",
    //     });
    //     setIsInit(true)
    // }
    // function runFunction(){
    //     // window["Mibew"].Objects.ChatPopups['5f945f00dbca991b']
    //     // window["Mibew"].Objects.ChatPopups.init({"id":"5f945f00dbca991b","url":"\/mibew\/chat?locale=en&name=<the desired visitor name>"})
    //     // window["Mibew"].Objects.ChatPopups['5f945f00dbca991b'].remove()
        
    //     initChat()
    //     window["Mibew"].Objects.ChatPopups['5f945f00dbca991b'].open()
    // }

    function OpenCSChat(){
        window["OpenCSChat"]();
    }
    return (
        <>
         <div className={styles.infoContainer}>
            <h1>Information</h1>
            <a href="/files/info-booklet-2.pdf" target="_blank" rel="noreferrer noopener">
              <span>Info Booklet</span>
            </a>
            <button onClick={OpenCSChat}>Live CS</button>
            {/* <a id="mibew-agent-button" href="http://conference.cintec.cuhk.edu.hk/mibew/index.php/chat?locale=en" target="_blank" onClick={runFunction()}>
                <img src="http://conference.cintec.cuhk.edu.hk/mibew/index.php/b?i=simple&amp;lang=en" border="0" alt="" />
            </a> */}
            {/* <a id="mibew-agent-button" href="http://conference.cintec.cuhk.edu.hk/mibew/index.php/chat?locale=en" target="_blank" onClick={"Mibew.Objects.ChatPopups['5f945f00dbca991b'].open();return false;"}>
                <img src="http://conference.cintec.cuhk.edu.hk/mibew/index.php/b?i=simple&amp;lang=en" border="0" alt="" />
            </a> */}
        </div>   
        </>
    )
}
