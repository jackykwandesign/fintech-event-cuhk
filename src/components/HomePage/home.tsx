import React from 'react'
import { EventButton } from  '../EventButton/eventButton'
import styles from './home.module.css'
const HomePage = (props:any)=>{
    

    return (
        <>
          <div className={styles.eventButton}>
            <EventButton></EventButton>
          </div> 
            
        </>
    )
}

export default HomePage

// import { Button, makeStyles, styled, TextField, withStyles } from '@material-ui/core';

// import React, { useMemo } from 'react';
// // import {ColorButton} from '../NavBar/navbar'
// import styles from './home.module.css'

// // const ContextStore = React.createContext({
// //     products: [],
// //     orders: [],
// //     firebase: Object,
// //     loadWebinar: ()=>{

// //     }
// // })

// // const StartButton = styled(Button)({
    
// //     color: '#fff !important',
// //     borderColor:'#fff !important',
// //     // fontSize:'1rem',
// //     // backgroundColor: 'transparent',
// //     // transition:'all 0.3s ease-out',
// //     // '&:hover': {
// //     //   backgroundColor:'white',
// //     //   color: 'black'
// //     // },

// // })
// // const StyledButton = withStyles({
// //   root:{
// //     // borderColor:'white',
// //     border:'1px solid rgba(0, 0, 0, 0.23)',
// //     transition:'all 0.3s ease-out',
// //     '&:hover': {
// //       backgroundColor:'#fff ',
// //       color: 'black '
// //     },
// //   },
// //   label:{
// //     color: 'white'
// //   }
// // })(Button);

// export const EventButton = () =>{
//   return (
//     <>
//     <img src="/images/icon-information.png" className={styles.icon_button}></img>
//     <img src="/images/icon-webinar.png" className={styles.icon_button}></img>
//     <img src="/images/icon-projectDemo.png" className={styles.icon_button}></img>
//     <img src="/images/icon-chatroom.png" className={styles.icon_button}></img>
//     </>
//     // <div className={styles.eventButton}>
//     // <img src="/images/icon-information.png" className={styles.icon_button}></img>
//     // <img src="/images/icon-webinar.png" className={styles.icon_button}></img>
//     // <img src="/images/icon-projectDemo.png" className={styles.icon_button}></img>
//     // <img src="/images/icon-chatroom.png" className={styles.icon_button}></img>
//     // </div>
//   )
// }



// export const HomePage = () =>{
//   const StyledButton = withStyles({
//     root: {
//       borderColor:'white',
//       color:'white',
//       // border:'1px solid rgba(0, 0, 0, 0.23)',
//       transition:'all 0.3s ease-out',
//       '&:hover': {
//         backgroundColor:'#fff ',
//         color: 'black ',
//         borderColor:'white',
//       },
//     },
//     // label: {
//     //   textTransform: 'capitalize',
//     // },
//   })(Button);
  

//   return (
//     <div className={styles.hero_container + " " + styles.backdrop}>
//     {/* <video src='/videos/cuhk-ie2020.mp4' autoPlay loop muted /> */}
//     {/* <img src="/images/backdrop.png" className={styles.backdrop}></img> */}
//     {/* <h1>CUHK FINTECH CONFERENCE 2020</h1>
//     <p>What are you waiting for?</p> */}
//     <div className={styles.eventButton}>
//     <EventButton />
//     </div>
    
//     {/* <div className={styles.hero_btns}>
//       <StyledButton   variant="outlined" size="large"  color="primary">
//         GET STARTED
//       </StyledButton >
//     </div> */}
//   </div>
//   );
// }

// // export default HomePage;