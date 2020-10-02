import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './webinarCard.module.css'
export interface WebinarInfo{
    name: string; 
    description?: string;
    zoomURL: string; 
    replayURL: string; 
    startTime: Date; 
    endTime: Date;
    // status:string ;
}
export const WebinarCard = ({webinarInfo, replay}:{webinarInfo:WebinarInfo, replay:boolean}) =>{
    const useStyles = makeStyles({
        root: {
          minWidth: 500,
          boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.3), 0px 1px 1px 0px rgba(0,0,0,0.3), 0px 1px 3px 0px rgba(0,0,0,0.3)",
        //   backgroundColor:"lightgray"
        //   minHeight: 150,
        //   color:"black"
        },
        media: {
          height: 140,
        },
      });
      const classes = useStyles();
    return (
        <div className={styles.webinarCard}>
        <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {webinarInfo.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {webinarInfo.description ? webinarInfo.description : "Join Webinar to get more Information !"}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
            {
                !replay ? 
                <Button size="small" variant="contained" color="primary" href={webinarInfo.zoomURL} target="_black" rel="noopener noreferrer">
                    Enter Webinar
                </Button>
                :
                <Button size="small" variant="contained" color="secondary" href={webinarInfo.replayURL} target="_black" rel="noopener noreferrer">
                    Replay
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
