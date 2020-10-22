import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import styles from '../demoCard.module.css'
import moment from 'moment';
export interface DemoDataDescription{
    content?: string;
    bold?: boolean;
    title?: string;
}
export interface DemoData {
    name: string;
    investigator: string;
    description: DemoDataDescription[];
    websiteURL: string;
    poster: string;
    youtubeURL: string;
    zoomURL: string;
    startTime?: Date;
    endTime?: Date;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height:420,
        width: '90%',
        boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.3), 0px 1px 1px 0px rgba(0,0,0,0.3), 0px 1px 3px 0px rgba(0,0,0,0.3)",
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: 'auto',
    },
    cover: {
        flex: '1 0 auto',
      width: 300,
      maxWidth: 300
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }));

export function Democard({
    demoData
}:{
    demoData:DemoData
}) {

 const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
        <CardMedia className={classes.cover} image={demoData.poster ? demoData.poster : "/images/demo/poster/poster-default.jpg"}
            title="Live from space album cover" />
        <div className={classes.details}>
            <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                    {demoData.name}
                </Typography>
                <Typography variant="subtitle1" color="initial">
                    Investigator: {demoData.investigator}
                </Typography>
 
                <div className={styles.timeContainer}>
                    <Typography variant="subtitle1" color="initial" component="p">
                        Live Demo: 
                    </Typography>

                    {/* <AccessTimeOutlinedIcon fontSize="small"/> */}
                
                    <Typography variant="subtitle1" color="initial" component="p">
                        
                        {
                            demoData.startTime ?
                            moment(demoData?.startTime).format('DD MMMM YYYY') + " " + moment(demoData.startTime).format('HH:mm')+ " - " + moment(demoData.endTime).format('HH:mm')
                            :
                            "TBC"
                        }
                    </Typography>

                </div>

                <br/>

                {/* <Typography component="h6" variant="h6">
                    Detail: 
                </Typography> */}
                {
                    demoData.description.length === 0 ? 

                    <Typography variant="subtitle1" color="initial" >
                        {" N/A "}
                    </Typography>
                    :
                    demoData.description.map((description, index)=>{
                        return (
                            <>
                                <Typography variant="subtitle1" color="initial" key = {`${demoData.name}-desc-${index}`}>
                                    {
                                        description.title && <><b>{description.title}</b><br/></>
                                    }
                                    {
                                        description.bold && 
                                        description.bold ? <b>{description.content}</b> : description.content
                                    }
                                </Typography>
                                {demoData.description.length !== index + 1 && <br/>}
                            </>
                        ) 
                    })
                }

            </CardContent>
            <div className={classes.controls}>
                {
                    demoData.zoomURL && 
                    <div className={styles.demoButton}>
                    <Button size="small" variant="contained" color="secondary" href={demoData.zoomURL} target="_black" rel="noopener noreferrer">
                        Live Demo in Zoom
                    </Button>
                    
                    </div>
                }
                {
                    demoData.youtubeURL && 
                    <div className={styles.demoButton}>
                    <Button size="small" variant="contained" color="primary" href={demoData.youtubeURL} target="_black" rel="noopener noreferrer">
                        Demo Video in Youtube
                    </Button>
                    </div>
                }

                {
                    demoData.websiteURL && 
                    <div className={styles.demoButton}>
                    <Button size="small" variant="contained" color="primary" href={demoData.websiteURL} target="_black" rel="noopener noreferrer">
                        Visit Website
                    </Button>
                    </div>
                }

                {/* <IconButton aria-label="previous">
                    {theme.direction === 'rtl' ?
                    <SkipNextIcon /> :
                    <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="play/pause">
                    <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                <IconButton aria-label="next">
                    {theme.direction === 'rtl' ?
                    <SkipPreviousIcon /> :
                    <SkipNextIcon />}
                </IconButton> */}
            </div>
        </div>

    </Card>
  );
}
