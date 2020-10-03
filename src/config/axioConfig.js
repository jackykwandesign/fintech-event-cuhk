
import axios from 'axios';
// import { message as GlobalMessage } from "antd"
// import 'antd/dist/antd.css'; 

axios.interceptors.request.use(async(req) => {

    const token = await localStorage.getItem('firebaseToken');
    // console.log("firebase Token", token)
    req.headers = {
      'Content-Type': 'application/json',
      "Authorization": token ? `Bearer ${token}` : ''
    }
    console.log(`${req.method} ${req.url}`);
    // Important: request interceptors **must** return the request.
    return req;
});

// axios.interceptors.response.use(async(res) => {
//   return res;
// },
// async(err)=>{
//   console.log("err",err.response)
//   const { message, statusCode} = err.response.data
//   console.log("message", message)
//   GlobalMessage.error(message)
//   return err;
// });

export default axios;