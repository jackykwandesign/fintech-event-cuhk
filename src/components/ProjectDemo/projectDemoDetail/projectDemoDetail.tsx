import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Democard, DemoData } from '../demoCard/demoCard'
import { DemoList } from '../projectDemo'
import styles from './projectDemoDetail.module.css'
import * as qs from 'query-string'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import Button from '@material-ui/core/Button'

interface Params {
    gp?: number;
}

const Projectdemodetail = (prop:any) => {

    let history = useHistory()
    const [gp, setGp] = useState<number|undefined>(undefined) 
    const [currentDemo, setCurrentDemo] = useState<DemoData | undefined>(undefined)
    useEffect(()=>{
        let params:Params = qs.parse(history.location.search)
        params.gp && setGp(params.gp)
        setCurrentDemo(DemoList[params.gp ? params.gp - 1 : 0])
    },[])

    const changeDemo = (i:number) =>{
        // history.push(`/2020fintech/projectDemoDetail?gp=${i}`)

    }

    return (
        <div >
            <table className={styles.demoDetailContainer} cellSpacing="0" cellPadding="0">
                <tr>
                    <td valign="top" className={styles.demoMenu}>
                        <p><img src="/images/icon-projectDemo.png" width="250" height="250" /></p>
                        {
                            DemoList.map((demo, index)=>{
                                return(
                                    <div onClick={()=>setCurrentDemo(DemoList[index])} className={styles.demoMenuItem}>
                                        
                                        <Typography variant="body1" >
                                            <b>{demo?.name}</b>
                                        </Typography>
                                        <Typography variant="body2" >
                                            {demo?.investigatorShort}
                                        </Typography>
                                        {DemoList.length !== index + 1 && <br/>}
                                    </div>
                                )
                            })
                        }
                        {/* <Typography variant="subtitle1" >
                            <b>{currentDemo?.name}</b>
                        </Typography>
                        <Typography variant="subtitle2" >
                            {currentDemo?.investigator}
                        </Typography> */}
                        {/* <p><strong>Ecosystem with Trustless Trust</strong><br />LI Junya, MSc FinTech Student </p>
                        <p><strong>Fintech Integrated Training Platform and Synthetic Data Sandbox</strong><br />Simnectz Technology Services Limited </p>
                        <p><strong>Gamifications – Financial Management with Customer Behavioral Analysis</strong><br />SHEN Yan, MSc FinTech Student </p>
                        <p><strong>P2P Loan Default Prediction by A.I.</strong><br />Jessica Liu, Dicky Chandra, Centre for Financial Engineering </p> */}
                    </td>
                    <td valign="top"  style={{padding:"1vw", width:"100%"}}>
                        <table style={{border:0}} cellSpacing="0" cellPadding="10">
                            <tr>
                                <td colSpan={2} align="center" valign="top" className={styles.demoTitle}>
                                    <p style={{font:"Verdana, Geneva, sans-serif", fontSize:"20px", backgroundColor:"AEE4F7 !important"}}>

                                        <Typography component="h5" variant="h5" >
                                            <b>{currentDemo?.name}</b>
                                        </Typography>
                                        <Typography variant="h6" >
                                            {currentDemo?.investigator}
                                        </Typography>
                                        {/* <strong></strong><br /> */}
                                        
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td valign="top">
                                    <br/>
                                {
                                    currentDemo?.description.length === 0 ? 

                                    <Typography variant="subtitle1" color="initial" >
                                        {" N/A "}
                                    </Typography>
                                    :
                                    currentDemo?.description.map((description, index)=>{
                                        return (
                                            <>
                                                <Typography variant="subtitle1" color="initial" className = {styles.demoContent}key = {`${currentDemo?.name}-desc-${index}`}>
                                                    {
                                                        description.title && <><b>{description.title}</b><br/></>
                                                    }
                                                    {
                                                        description.bold && 
                                                        description.bold ? <b>{description.content}</b> : description.content
                                                    }
                                                </Typography>
                                                {currentDemo?.description.length !== index + 1 && <br/>}
                                            </>
                                        ) 
                                    })
                                }

                                    <br/>
                                    <p>
                                        <em>
                                            Website: {currentDemo?.websiteURL  ? <a href={currentDemo?.websiteURL } target="_black" rel="noopener noreferrer">{currentDemo?.websiteURL}</a> : "N/A"}
                                        </em>
                                    </p>
                                    <br/>
                                    <p>
                                        <a href={currentDemo?.posterBig ? currentDemo?.posterBig : "/images/demo/poster/poster-default.jpg"} target="_black" rel="noopener noreferrer">
                                            <img src={currentDemo?.poster ? currentDemo?.poster : "/images/demo/poster/poster-default.jpg"} className={styles.demoPoster} alt={`${currentDemo?.name}-poster`} />
                                        </a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td valign="top" className={styles.demoMeetingMenu}>
                        <br/>
                        <div className={styles.circleBase}><b>Online Meeting: </b></div>
                        <Typography variant="subtitle1" color="initial" component="p">
                        
                        {
                            currentDemo?.startTime ?
                            <>
                                {moment(currentDemo?.startTime).format('DD MMMM YYYY')}
                                <br/>
                                {moment(currentDemo?.startTime).format('HH:mm')+ " - " + moment(currentDemo?.endTime).format('HH:mm')}
                                <br/>
                                <Button size="small" variant="contained" color="primary" href={currentDemo?.zoomURL} target="_black" rel="noopener noreferrer">
                                    Live Demo in Zoom
                                </Button>
                            </>

                            :
                            "TBC"
                        }
                        </Typography>
                        <p><img src="/images/demo/asset/chair.png" width="200" height="200" style={{border:"thick"}} /></p>
                        {/* <p><img src="/images/demo/asset/Demo Video-01.jpg" alt="" width="200" height="300" style={{border:"thick"}} /></p> */}
                        <br/>
                        <br/>
                        <div className={styles.circleBase}><b>Demo Video: </b></div>
                        <br/>
                        
                        {
                            currentDemo?.youtubeURL ? 
                            
                                <iframe 
                                    width="200" 
                                    height="200" 
                                    src={currentDemo?.youtubeURL}
                                    frameBorder={0}
                                    allow={"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}
                                    allowFullScreen={true}
                                    
                                />
                            
                            : "N/A"}

                    </td>
                </tr>
            </table>
        </div>

    )
}
export default Projectdemodetail

// export default withRouter(Projectdemodetail)


// import React, { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'
// import { Democard } from '../demoCard/demoCard'
// import { DemoList } from '../projectDemo'
// import styles from '../demoCard.module.css'
// import * as qs from 'query-string'

// interface Params {
//     gp?: number;
// }

// const Projectdemodetail = (prop:any) => {

//     let history = useHistory()
//     const [gp, setGp] = useState<number|undefined>(undefined) 

//     useEffect(()=>{
//         let params:Params = qs.parse(history.location.search)
//         params.gp && setGp(params.gp)
//     },[])

//     return (
//         <div className={styles.demoDetailContainer}>

//         {
//             gp && 
//             <Democard
//                 demoData = {DemoList[gp - 1]}
//             />
//         }
//         </div>

//     )
// }
// export default Projectdemodetail

// // export default withRouter(Projectdemodetail)
