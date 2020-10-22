// import Axios from 'axios'
import React, { useEffect } from 'react'
import { Democard, DemoData } from './demoCard/demoCard'
import styles from './demoCard.module.css'
// import ConfigAxio from '../../config/axioConfig'

const demoList: DemoData[] = [
    {
        name:`Demo Test 1 `,
        investigator: "By Chan Siu Ming, Collaborating Organizations: IT Tester Demo",
        description: [
            {
                title: "test title",
                content:"test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description ",
            },
            {
                content:"test paragraph 2 test paragraph 2 test paragraph 2 test paragraph 2 test paragraph 2 test paragraph 2 test paragraph 2 test paragraph 2 test paragraph 2 test paragraph 2 test paragraph 2 test paragraph 2 test paragraph 2 ",
            },
    
        ],
        websiteURL:"https://www.facebook.com/",
        poster:"/images/demo/poster/poster-gp3.jpg",
        youtubeURL:"https://youtube.com",
        zoomURL:"https://cuhk.zoom.us/j/98163565145",
        startTime: new Date('October 20, 2020 10:00:00 GMT+8:00'),
        endTime:    new Date('November 2, 2020 12:00:00 GMT+8:00'),
    },
    {
        name:`An Overview of FinTecubator`,
        investigator: "Hang Seng Bank Limited",
        description: [
            {
                content:"FinTecubator is an entity level Fintech incubator programme within Hang Seng Bank. The programme helps to nurture internal start-up companies, creates business values, and grows the innovation & technology ecosystem via co-creation and strategic partnerships with Fintech communities. We also collaborate with universities to discover and retain young talents to be our future leaders.",
            },
            {
                content:"FinTecubator, combining the bank’s scale, reach and brand, helps the business units and digital leaders to take their business further and bigger, aiming to become change makers to transform the banking sector.",
            },
    
        ],
        websiteURL:"https://www.fintecubator.com/",
        poster:"",
        youtubeURL:"",
        zoomURL:"",
    },
    {
        name:`Ecosystem with Trustless Trust`,
        investigator: "By LI Junya, MSc FinTech Student, Collaborating Organizations: HASE",
        description: [
            {
                content:"As the increasingly popular trend of online traveling shopping, in order to cope with trustless issue between customer and merchant in online payment, a technical solution will be illustrated, customer journey with trustless payment. This solution is to design an open API to connect HASE Trustless Payment to some travel platforms to make the travel experience more secure. When customers choose this payment, they can experience risk assessment model based on machine learning algorithms from HASE, “BANK HOLD MONEY” mechanism to money flow more secure, feedback mechanism between customers and merchant, etc.",
            },
        ],
        websiteURL:"https://www.fintecubator.com/",
        poster:"",
        youtubeURL:"https://youtu.be/RB-IzbVamHY",
        zoomURL:"",
    },
    {
        name:`Fintech Integrated Training Platform and Synthetic Data Sandbox`,
        investigator: "Simnectz Technology Services Limited",
        description: [
            {
                content:"SIMNECTZ is a technology company located in Cyberport, especially focusing on financial technology. It provides and implements different solutions for major banks and third-party companies. The company’s concentrated solution products include lightweight core banking systems and API layout Platform and synthetic data sandbox.",
                bold:false
            },
            {
                title:"Integrated Fintech Training Platform",
                content:"We provide a all-rounded Fintech training platform for education institution or individual learner to foster their techniques in learning process.",
                bold:false
            },
            {
                title:"Data Sandbox",
                content:"A standalone data environment with 10m+ simulated banking data, providing a secure, effective and seamless testing environment.",
                bold:false
            },
        ],
        websiteURL:"Simnectz.com",
        poster:"/images/demo/poster/poster-gp3.jpg",
        youtubeURL:"",
        zoomURL:"",
    },
    {
        name:`Gamifications – Financial Management with Customer Behavioral Analysis`,
        investigator: "By SHEN Yan, MSc FinTech Student, Academic Supervisor: Professor CHAN Chun Kwong, Industrial Supervisor: Mr. Stephen S Y LEUNG, Ms Angela O K CHONG, Chris, Sharon and Jacky",
        description: [
            {
                content:"Based on the research on the game market and wealth management market in Mainland China and Hong Kong, determine the future development prospects of wealth management games and players’ preferences and needs for wealth management games. An evaluation model can be used to distinguish whether the game can be successful is obtained, and the game design and testing are carried out according to the model elements.",
                bold:false
            },
        ],
        websiteURL:"",
        poster:"/images/demo/poster/poster-gp4.jpg",
        youtubeURL:"https://youtu.be/b7qOwYioxnI",
        zoomURL:"",
    },

    {
        name:`P2P Loan Default Prediction by A.I.`,
        investigator: "By Jessica Liu, Dicky Chandra, Centre for Financial Engineering, Supervisor: Dr Keith WONG, and Prof. Raymond TSANG (by courtesy), Centre for Financial Engineering",
        description: [
            {
                content:"P2P lending is of a growing interest nowadays. Accurate prediction of the default risk is crucial to the business’ profitability and the automation of prediction boosts the efficiency by saving more costs as well as facilitating the matching of investors and borrowers. Financial technologies play an important role here thanks to the availability of historical datasets. In this project, we independently validated a two-phase loan default prediction model from an academic paper, in which machine learning methods are applied to a loan data set for the prediction and worked out some improvements. We will share our conclusions both in the business and model implementation aspects, accompanied by a prototype illustrating the online loan application process.",
                bold:false
            },
        ],
        websiteURL:"https://www.linkedin.com/feed/update/urn:li:activity:6724167761792266241",
        poster:"/images/demo/poster/poster-gp5.jpg",
        youtubeURL:"",
        zoomURL:"",
    },
]

export function ProjectDemo(props: any) {
    const handleAsync = async()=>{
        // const res = await Axios.post("/api/auth/login")
        // console.log("res", res)
    }
    useEffect(()=>{
        handleAsync()
    },[])

    return (
        <div className={styles.demoListContainer}>
            <h1>Project Demo</h1>
            <br/>
            {
                demoList.map(demo=>{
                    return (
                        <>
                            <Democard
                                demoData = {demo}
                            />
                            <br/>
                            <br/>
                        </>
                    )
                })
            }
        </div>
    )
}
