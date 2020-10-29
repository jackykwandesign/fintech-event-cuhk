import React from 'react'
import styles from './projectButton.module.css'
import {Link} from 'react-router-dom'
import { DemoList } from '../projectDemo'
export const ProjectButton = () => {
  return (
    <div className={styles.icon_container}>
    {
      DemoList.map((demo, i)=>{
        return (     
            <Link to={`/2020fintech/projectDemoDetail?gp=${i+1}`}>
              <div className={styles.img_container}>
                <img src={ demo.poster ? demo.poster : "/images/demo/poster/poster-default.jpg"} key={`projectButton-${i+1}`}className={styles.img_button} alt={`poster-gp${i+1}`}/>
                <h3>{demo.name}</h3>
              </div>
            </Link>
        )
      })
    }
    </div>
  )
}
 