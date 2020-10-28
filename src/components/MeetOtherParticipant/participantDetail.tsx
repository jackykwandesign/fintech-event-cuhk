import React, { useEffect, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { DownOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ProTable, { IntlProvider, ProColumns, enUSIntl  } from '@ant-design/pro-table';
import { DBUser } from '../../contexts/firebaseContext/firebaseContext';
import { getAllShareParticipant } from '../../service/participant';
import styles from './participantDetail.module.css'
import Typography from '@material-ui/core/Typography'
import 'antd/dist/antd.css';
import en_US from 'antd/lib/locale/en_US';

// const enLocale = {
//     tableFrom: {
//       search: 'Query',
//       reset: 'Reset',
//       submit: 'Submit',
//       collapsed: 'Expand',
//       expand: 'Collapse',
//       inputPlaceholder: 'Please enter',
//       selectPlaceholder: 'Please select',
//     },
//     alert: {
//       clear: 'Clear',
//     },
//     tableToolBar: {
//       leftPin: 'Pin to left',
//       rightPin: 'Pin to right',
//       noPin: 'Unpinned',
//       leftFixedTitle: 'Fixed the left',
//       rightFixedTitle: 'Fixed the right',
//       noFixedTitle: 'Not Fixed',
//       reset: 'Reset',
//       columnDisplay: 'Column Display',
//       columnSetting: 'Settings',
//       fullScreen: 'Full Screen',
//       exitFullScreen: 'Exit Full Screen',
//       reload: 'Refresh',
//       density: 'Density',
//       densityDefault: 'Default',
//       densityLarger: 'Larger',
//       densityMiddle: 'Middle',
//       densitySmall: 'Compact',
//     },
//   };
//   // 生成 intl 对象
//   const enUSIntl = createIntl('en_US', en_US);
// function compare(first, second) {
//     if (first.last_nom < second.last_nom)
//         return -1;
//     if (first.last_nom > second.last_nom)
//       return 1;
//    return 0;
// }
const mailToFunction = (email:string)=>{
    window.open(`mailto:${email}`)
}
const interestParticipantList:(DBUser[])[] = [[],[],[],[],[]]
const columns: ProColumns<DBUser>[] = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a:DBUser, b:DBUser) => {
            return a.name.localeCompare(b.name);
        }
        // sorter: (a:DBUser, b:DBUser) => {
        //     if(a.name < b.name){
        //         return -1;
        //     }
        //     if(b.name > a.name)
        //     {
        //         return 1
        //     }
        //     return 0
        // },
    },
    {
        title: 'Job Title',
        dataIndex: ['kycData','jobTitle'],
        sorter: (a:DBUser, b:DBUser) => {
            return a.kycData.jobTitle.localeCompare(b.kycData.jobTitle);
        }
    },
    {
        title: 'Organization',
        dataIndex: ['kycData','organization'],
        sorter: (a:DBUser, b:DBUser) => {
            return a.kycData.organization.localeCompare(b.kycData.organization);
        }
    },
    {
        title:"Send Email",
        dataIndex:'email',
        render: (text, row, index, action) => {
            return(
                <a onClick={()=>mailToFunction(text as string)} target="_blank" rel="noopener noreferrer">Send Email</a>
                // <a  href={`mailto:${text}`} target="_blank" rel="noopener noreferrer">Send Email</a>
            )
        }
    }
]
const ParticipantDetail = (props:any) =>{
    const [currentInterest, setcurrentInterest] = useState<string | undefined>("Big Data Analytics")
    const [currentParticipantList, setCurrentParticipantList] = useState<DBUser[]>([])
    const interestList = ["Big Data Analytics","FinTech in the Banking/Virtual Banking","AI and Machine Learning","STO/Tokenization/Virtual Assets","Cybersecurity"]

    const handleChangeInterest = async(index:number) =>{
        await setcurrentInterest(interestList[index])
        // console.log("Current:", interestList[index])
        await setCurrentParticipantList(interestParticipantList[index])
        // console.log("currentParticipantList:", interestParticipantList[index])
    }
    const compare = (a:DBUser, b:DBUser) =>{
        return a.name.localeCompare(b.name); 
    }
    const getDataAsync = async() =>{
        const res = await getAllShareParticipant()
        res?.sort(compare)
        // console.log(res)
        res?.map(user=>{
            for(let i = 0; i < 5; i++){
                if(user.kycData.interestCheckbox.includes(interestList[i])){
                    interestParticipantList[i].push(user)
                }
            }
        })
        // console.log("interestParticipantList", interestParticipantList)
        handleChangeInterest(0)
    }

    useEffect(()=>{
        getDataAsync()
    },[])

    
    return (
        <div >
            <table className={styles.demoDetailContainer} cellSpacing="0" cellPadding="0">
                <tr>
                    <td valign="top" className={styles.demoMenu}>
                        <p><img src="/images/icon-chatroom.png" width="250" height="250" /></p>
                        {
                            interestList.map((interest, index)=>{
                                return(
                                    <div onClick={()=>handleChangeInterest(index)} className={styles.demoMenuItem} key={"interest-"+index}>
                                        
                                        <Typography variant="body1" >
                                            <b>{interest}</b>
                                        </Typography>
                                        {interestList.length !== index + 1 && <br/>}
                                    </div>
                                )
                            })
                        }
                    </td>
                    <td valign="top"  style={{padding:"1vw", width:"100%", minWidth:"1150px"}}>
                    <IntlProvider value={{ intl: enUSIntl}}>
                        <ProTable<DBUser> 
                            rowKey="name"
                            pagination={{
                                showQuickJumper: true,
                            }}
                            columns={columns}
                            dataSource={currentParticipantList}
                            dateFormatter="string"
                            search={false}
                            // headerTitle="表格标题"
                            toolBarRender={false}
                        />
                    </IntlProvider>

                        {/* {
                            currentParticipantList.map((user, index)=>{
                                return (
                                <>
                                    <p key={"user"+index}>
                                        {user.name}-{user.kycData.jobTitle}@{user.kycData.organization}
                                    </p>
                                    <br/>
                                </>
                                )
                            })
                        } */}
                    </td>
                   
                </tr>
            </table>
        </div>

    )
    // return(

    // )
}
export default ParticipantDetail

// import React, { useEffect, useState } from 'react'
// import { Link, useHistory } from 'react-router-dom'
// // import { Democard, DemoData } from '../demoCard/demoCard'
// // import { DemoList } from '../projectDemo'
// import styles from './participantDetail.module.css'
// import Typography from '@material-ui/core/Typography'
// import moment from 'moment'
// import Button from '@material-ui/core/Button'
// import { getAllShareParticipant } from '../../service/participant'
// import { DBUser } from '../../contexts/firebaseContext/firebaseContext'

// interface Params {
//     gp?: number;
// }
// const interestParticipantList:(DBUser[])[] = [[],[],[],[],[]]

// const ParticipantDetail = (prop:any) => {

//     let history = useHistory()
//     const [currentInterest, setcurrentInterest] = useState<string | undefined>("Big Data Analytics")
//     const [currentParticipantList, setCurrentParticipantList] = useState<DBUser[]>([])
//     const interestList = ["Big Data Analytics","FinTech in the Banking/Virtual Banking","AI and Machine Learning","STO/Tokenization/Virtual Assets","Cybersecurity"]
    
//     const handleChangeInterest = async(index:number) =>{
//         await setcurrentInterest(interestList[index])
//         // console.log("Current:", interestList[index])
//         await setCurrentParticipantList(interestParticipantList[index])
//         // console.log("currentParticipantList:", interestParticipantList[index])
//     }
//     const getDataAsync = async() =>{
//         const res = await getAllShareParticipant()
//         console.log(res)
//         res?.map(user=>{
//             for(let i = 0; i < 5; i++){
//                 if(user.kycData.interestCheckbox.includes(interestList[i])){
//                     interestParticipantList[i].push(user)
//                 }
//             }
//         })
//         // console.log("interestParticipantList", interestParticipantList)
//         handleChangeInterest(0)
//     }

//     useEffect(()=>{
//         getDataAsync()
//     },[])


    // return (
    //     <div >
    //         <table className={styles.demoDetailContainer} cellSpacing="0" cellPadding="0">
    //             <tr>
    //                 <td valign="top" className={styles.demoMenu}>
    //                     <p><img src="/images/icon-chatroom.png" width="250" height="250" /></p>
    //                     {
    //                         interestList.map((interest, index)=>{
    //                             return(
    //                                 <div onClick={()=>handleChangeInterest(index)} className={styles.demoMenuItem} key={"interest-"+index}>
                                        
    //                                     <Typography variant="body1" >
    //                                         <b>{interest}</b>
    //                                     </Typography>
    //                                     {interestList.length !== index + 1 && <br/>}
    //                                 </div>
    //                             )
    //                         })
    //                     }
    //                 </td>
    //                 <td valign="top"  style={{padding:"1vw", width:"100%", minWidth:"1150px"}}>
    //                     {
    //                         currentParticipantList.map((user, index)=>{
    //                             return (
    //                             <>
    //                                 <p key={"user"+index}>
    //                                     {user.name}-{user.kycData.jobTitle}@{user.kycData.organization}
    //                                 </p>
    //                                 <br/>
    //                             </>
    //                             )
    //                         })
    //                     }
    //                 </td>
                   
    //             </tr>
    //         </table>
    //     </div>

    // )
// }
// export default ParticipantDetail
