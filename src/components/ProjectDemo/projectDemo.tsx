import React, { useEffect } from 'react'
import ConfigAxio from '../../config/axioConfig'
export function ProjectDemo(props: any) {
    const handleAsync = async()=>{
        const res = await ConfigAxio.post("/api/auth/login")
        console.log("res", res)
    }
    useEffect(()=>{
        handleAsync()
    },[1])

    return (
        <>
            <h1>Project Demo</h1>
        </>
    )
}