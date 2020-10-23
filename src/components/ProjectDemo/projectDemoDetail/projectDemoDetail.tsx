import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Democard } from '../demoCard/demoCard'
import { DemoList } from '../projectDemo'
import styles from '../demoCard.module.css'
import * as qs from 'query-string'

interface Params {
    gp?: number;
}

const Projectdemodetail = (prop:any) => {

    let history = useHistory()
    const [gp, setGp] = useState<number|undefined>(undefined) 

    useEffect(()=>{
        let params:Params = qs.parse(history.location.search)
        params.gp && setGp(params.gp)
    },[])

    return (
        <div className={styles.demoDetailContainer}>

        {
            gp && 
            <Democard
                demoData = {DemoList[gp - 1]}
            />
        }
        </div>

    )
}
export default Projectdemodetail

// export default withRouter(Projectdemodetail)
