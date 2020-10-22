import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './webinarCard.module.css'
import moment from 'moment';
import { AppContext } from '../../../contexts/firebaseContext/firebaseContext';
export interface WebinarInfo{
    name: string; 
    description: string[];
    zoomURL: string; 
    replayURL: string; 
    startTime: Date; 
    endTime: Date;
    // status:string ;
}
export const WebinarCard = ({webinarInfo, replay, currentTime}:{webinarInfo:WebinarInfo, replay:boolean, currentTime:Date}) =>{
    
    const { isSignin } = useContext(AppContext)
    const useStyles = makeStyles({
        root: {
        //   minWidth: 4,
          minWidth:"300px",
        //   maxWidth:"600px",
          width:"100%",
          boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.3), 0px 1px 1px 0px rgba(0,0,0,0.3), 0px 1px 3px 0px rgba(0,0,0,0.3)",
        },
        media: {
          height: 140,
        },
      });
      const classes = useStyles();
    //   if(currentTime >= webinarInfo.startTime && currentTime <= webinarInfo.endTime){
    //       console.log("name: ", webinarInfo.name)
    //     console.log("currentTime: ",currentTime)
    //     console.log("startTime: ",webinarInfo.startTime)
    //     console.log("endTime: ",webinarInfo.endTime)
    //   }
    // let descriptionsArray = webinarInfo.description ? webinarInfo.description.split("\n") : []
    // console.log("descriptionsArray",descriptionsArray)
    return (
        
        <div className={styles.webinarCard}>
        <Card className={classes.root}>
        <CardActionArea>
          <CardContent>

            <Typography gutterBottom variant="h5" component="h2">
                <div className={styles.titleContainer}>
                    {webinarInfo.name}
                    {
                        currentTime >= webinarInfo.startTime && currentTime < webinarInfo.endTime &&
                        <div className={styles.sameRow}><span style={{color:"red"}}>Live</span><LiveTvIcon style={{fill:"red"}}/></div>
                        
                    }
                </div>
              
            </Typography>
            {/* <div className={styles.timeContainer}>
                <AccessTimeOutlinedIcon fontSize="small"/> {moment(webinarInfo.startTime).format('HH:mm')+ " - " + moment(webinarInfo.endTime).format('HH:mm')}
            </div> */}

            <div className={styles.timeContainer}>
            
                <AccessTimeOutlinedIcon fontSize="small"/>
            
                <Typography variant="subtitle1" color="initial" component="p">
                    {moment(webinarInfo.startTime).format('DD MMMM YYYY') + " " + moment(webinarInfo.startTime).format('HH:mm')+ " - " + moment(webinarInfo.endTime).format('HH:mm')}
                </Typography>
            </div>
            {/* <Typography variant="subtitle1" color="textSecondary" component="p">
                <div className={styles.timeContainer}>
                    <AccessTimeOutlinedIcon fontSize="small"/> {moment(webinarInfo.startTime).format('HH:mm')+ " - " + moment(webinarInfo.endTime).format('HH:mm')}
                </div>
            </Typography> */}
            {
                webinarInfo.description.length === 0 ? 
                <Typography variant="body2" color="textSecondary" component="p">
                    {"Join Webinar to get more Information !"}
                </Typography>
                :
                webinarInfo.description.map((description, index)=>{
                    let dataArray = description.split('\n')
                    if(dataArray.length === 1){
                        return (
                            <>
                                <Typography variant="body2" color="textSecondary" component="p" key = {`${webinarInfo.name}-desc-${index}`}>
                                    <b>{dataArray[0]}</b>
                                </Typography>
                                {webinarInfo.description.length !== index + 1 && <br/>}
                            </>
                        ) 
                    }else{
                        return (
                            <>
                            <Typography variant="body2" color="textSecondary" component="p" key = {`${webinarInfo.name}-desc-${index}-0`}>
                        
                                <b>{dataArray[0]}</b>
                                <br/>
                                {dataArray[1]}
                                <br/>
                                
                            </Typography>
                            {webinarInfo.description.length !== index + 1 && <br/>}
                            </>
                        )
                        // dataArray.map((data, dataIndex)=>{
                        //     return (
                        //         <Typography variant="body2" color="textSecondary" component="p" key = {`${webinarInfo.name}-desc-${index}-0`}>
                        //             {dataArray[0]}<br/>
                        //         </Typography>
                        //     )
                        // })
                    }
                })
            }

            {/* <Typography variant="body2" color="textSecondary" component="p">
                {webinarInfo.description ? webinarInfo.description : "Join Webinar to get more Information !"}
            </Typography> */}


          </CardContent>
        </CardActionArea>
        <CardActions>
            {
                !replay ? 
                    isSignin ? 
                    <Button size="small" variant="contained" color="primary" href={webinarInfo.zoomURL} target="_black" rel="noopener noreferrer">
                        Enter Webinar
                    </Button>
                    :
                    <Button size="small" variant="contained" color="primary" href="/register">
                        Login in to Enter Webinar
                    </Button>
                :
                webinarInfo.replayURL ? 
                    isSignin ? 
                        <Button size="small" variant="contained" color="secondary" href={webinarInfo.replayURL} target="_black" rel="noopener noreferrer">
                            Replay
                        </Button>
                        :
                        <Button size="small" variant="contained" color="secondary" href="/register">
                            Login in to watch Replay
                        </Button>
                    :
                    <Button size="small" variant="contained" color="secondary" disabled href={webinarInfo.replayURL} target="_black" rel="noopener noreferrer">
                        Uploading Replay 
                    </Button>
            }


        </CardActions>
      </Card>
      </div>
        // <div className={styles.webinarCard}>
        //     <h2>{webinarInfo.name}</h2>

        //     {/* <span>{webinarInfo.zoomURL}</span>
        //     <span>{webinarInfo.replayURL}</span> */}
        //     <span>{webinarInfo.startTime.toLocaleDateString()}</span>
        //     <span>{webinarInfo.endTime.toLocaleDateString()}</span>
        //     {/* <span>{webinarInfo.status}</span> */}
        // </div>
    )
}
