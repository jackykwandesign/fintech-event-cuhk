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
                <img src={ demo.poster ? demo.poster : "/images/demo/poster/poster-default.jpg"} className={styles.img_button} alt={`poster-gp${i+1}`}/>
                <h3>{demo.name}</h3>
              </div>
            </Link>
        )
      })
    }
    </div>
  )
}
  // return (

  //   <div className={styles.icon_container}>
  //     <Link to="/2020fintech/projectDemo/gp1">
  //       <div className={styles.img_container}>
  //         <img src="/images/demo/poster/poster-default.jpg" className={styles.img_button} alt={"poster-gp1"}/>
  //         <h3>An Overview of FinTecubator</h3>
  //       </div>
  //     </Link>
  //     <Link to="/2020fintech/projectDemo/gp2">
  //       <div className={styles.img_container}>
  //         <img src="/images/demo/poster/poster-default.jpg" className={styles.img_button} alt={"poster-gp2"}/>
  //         <h3>Ecosystem with Trustless Trust</h3>
  //       </div>
  //     </Link>
  //     <Link to="/2020fintech/projectDemo/gp3">
  //       <div className={styles.img_container}>
  //         <img src="/images/demo/poster/poster-gp3.jpg" className={styles.img_button} alt={"poster-gp3"}/>
  //         <h3>Fintech Integrated Training Platform and Synthetic Data Sandbox</h3>
  //       </div>
  //     </Link>
  //     <Link to="/2020fintech/projectDemo/gp4">
  //       <div className={styles.img_container}>
  //         <img src="/images/demo/poster/poster-gp4.jpg" className={styles.img_button} alt={"poster-gp4"}/>
  //         <h3>Gamifications – Financial Management with Customer Behavioral Analysis</h3>
  //       </div>
  //     </Link>
  //     <Link to="/2020fintech/projectDemo/gp5">
  //       <div className={styles.img_container}>
  //         <img src="/images/demo/poster/poster-gp5.jpg" className={styles.img_button} alt={"poster-gp5"}/>
  //         <h3>P2P Loan Default Prediction by A.I.</h3>
  //       </div>
  //     </Link>
  //   </div>
  // )

