
import axios from 'axios';
//interceptors to put firebase token in Axios request
axios.interceptors.request.use(async(req) => {

    const token = await localStorage.getItem('firebaseToken');
    console.log("firebase Token", token)
    req.headers = {
      'Content-Type': 'application/json',
      "Authorization": token ? `Bearer ${token}` : ''
    }
    console.log(`${req.method} ${req.url}`);
    // Important: request interceptors **must** return the request.
    return req;
  });

export default axios;