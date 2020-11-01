import React, { useEffect, useState } from 'react';
import { DownOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ProTable, { IntlProvider, ProColumns, enUSIntl  } from '@ant-design/pro-table';
import { DBUser } from '../../contexts/firebaseContext/firebaseContext';
import { getAllShareParticipant, sendMessageToParticipant } from '../../service/participant';
import styles from './participantDetail.module.css'
import Typography from '@material-ui/core/Typography'
import 'antd/dist/antd.css';
import en_US from 'antd/lib/locale/en_US';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { Controller, useForm } from "react-hook-form";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

// const mailToFunction = (email:string)=>{
//     window.open(`mailto:${email}`)
// }


interface FillInforField {
    message: string;
}

const interestParticipantList:(DBUser[])[] = [[],[],[],[],[]]

const ParticipantDetail = (props:any) =>{
    const columns: ProColumns<DBUser>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a:DBUser, b:DBUser) => {
                return a.name.localeCompare(b.name);
            }
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
                    // <a onClick={()=>mailToFunction(text as string)} target="_blank" rel="noopener noreferrer">Send Email</a>
                    <Button variant="outlined" color="primary" onClick={() => handleClickOpen(text as string)}>
                        Message
                    </Button>
                    // <a  href={`mailto:${text}`} target="_blank" rel="noopener noreferrer">Send Email</a>
                )
            }
        }
    ]
    const [open, setOpen] = React.useState(false);
    const [isSending, setIsSening] = React.useState(false);
    const [receiverEmail, setReceiverEmail] = useState<string>("")
    const defaultValues:FillInforField = {
        message:""
    }

    const { register, handleSubmit, watch, control } = useForm({defaultValues});
    const handleClickOpen = (email:string) => {
        setReceiverEmail(email)
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const sendMessage = async(email:string) =>{
        let message = watch("message")
        // console.log("message", message)
        setIsSening(true)
        let res = await sendMessageToParticipant(message as string, email)
        setIsSening(false)
        handleClose()
    }

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
                <tbody>
                <tr>
                    <td valign="top" className={styles.demoMenu}>
                        <p><img src="/images/icon-chatroom.png" width="250" height="250" /></p>
                        <div>
                            <Typography variant="h6" >
                                <b>List of Participants by area of Interests: </b>
                            </Typography>
                        </div>
                        <br/>
                        {
                            interestList.map((interest, index)=>{
                                return(
                                    <div onClick={()=>handleChangeInterest(index)} className={styles.demoMenuItem} key={"interest-"+index}>
                                        
                                        <Typography variant="subtitle2" >
                                            <b>{interest}</b>
                                        </Typography>
                                        {interestList.length !== index + 1 && <br/>}
                                    </div>
                                )
                            })
                        }
                        <br/>
                        <Link to="/2020fintech/chatroom">
                            <Button size="small" variant="contained" color="primary">
                                Chatroom
                            </Button>
                        </Link>

                    </td>
                    <td valign="top"  style={{padding:"1vw", width:"100%", minWidth:"1150px"}}>
                    <IntlProvider value={{ intl: enUSIntl}}>
                        <ProTable<DBUser> 
                            rowKey="email"
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
                </tbody>
            </table>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Send Message</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To send message, please enter your message here.
                </DialogContentText>
                <TextField
                    // variant="outlined"
                    required
                    fullWidth
                    id="message"
                    label="Message"
                    name="message"
                    inputRef={register({ required: true, maxLength: 50 })}
                />
                {/* <TextField
                    autoFocus
                    margin="dense"
                    id="message"
                    label="Message"
                    // type="email"
                    fullWidth
                /> */}
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                {
                    isSending ? 
                    <CircularProgress size={30}/> : 
                    <Button onClick={() => sendMessage(receiverEmail)} color="primary">
                        Send
                    </Button>
                }

                </DialogActions>
            </Dialog>
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
