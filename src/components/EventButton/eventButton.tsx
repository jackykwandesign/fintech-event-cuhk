import React from 'react'
import styles from './eventButtom.module.css'
import {Link} from 'react-router-dom'
export const EventButton = () =>{

  return (
    <>
    <Link to="/information">
      <img src="/images/icon-information.png" className={styles.icon_button} alt={"icon-information"}/>
    </Link>
    <Link to="/webinar">
      <img src="/images/icon-webinar.png" className={styles.icon_button} alt={"icon-webinar"}/>
    </Link>
    <Link to="/projectDemo">
      <img src="/images/icon-projectDemo.png" className={styles.icon_button} alt={"icon-projectDemo"}/>
    </Link>
    <Link to="/chatroom">
      <img src="/images/icon-chatroom.png" className={styles.icon_button} alt={"icon-chatroom"}/>
    </Link>
    </>
  )
}
