import React from 'react'
import styles from './information.module.css'
export function Information(props:any) {
    

    return (
        <>
         <div className={styles.infoContainer}>
            <h1>Information</h1>
            <a href="/files/booklet.pdf" target="_blank" rel="noreferrer noopener">
              <span>Info Booklet</span>
            </a>
            
        </div>   
        </>
    )
}
