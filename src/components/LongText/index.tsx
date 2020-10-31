import React, { useState, useRef, useEffect } from 'react'
import styles from './style.module.css'

const Longtext = ({text}:{text:string}) => {
    const [showAll, setShowAll] = useState(false);
    const [textWidth, setTextWidth] = useState(0)
    const ref = useRef<HTMLHeadingElement>(null);
    let limitWidth = 200;
    // useEffect(() => {
    //     const width = ref.current ? ref.current.offsetWidth : 0;
    //     setTextWidth(width)
    // }, [ref.current]);
    useEffect(() => {
        const width = ref.current ? ref.current.offsetWidth : 0;
        setTextWidth(width)
    }, [text]);
    const toggleShowAll = () =>{
        setShowAll(!showAll)
    }
    return (
        <>
            <div>
                <span ref={ref} 
                    className = { (textWidth > limitWidth) ? (showAll ? styles.descriptionAll : styles.description) : ''}
                >
                    {text}
                </span>
                {
                    (textWidth > limitWidth) &&
                <a className = {styles.showAllButton} onClick = {toggleShowAll}>{showAll ? '收納' : '展開'}</a>
                }
                {/* <span ref={ref} className={showAll === false ? styles.description : styles.descriptionAll}>{text}</span>
                <a className = {styles.showAllButton} onClick = {toggleShowAll}> 展開</a> */}
            </div>
            
        </>
    )
}

export default Longtext