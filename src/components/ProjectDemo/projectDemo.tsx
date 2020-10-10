// import Axios from 'axios'
import React, { useEffect } from 'react'
// import ConfigAxio from '../../config/axioConfig'
export function ProjectDemo(props: any) {
    const handleAsync = async()=>{
        // const res = await Axios.post("/api/auth/login")
        // console.log("res", res)
    }
    useEffect(()=>{
        handleAsync()
    },[])

    return (
        <>
            <h1>Project Demo</h1>
        </>
    )
}
