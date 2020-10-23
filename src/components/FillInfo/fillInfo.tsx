import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { FillUserInfo } from '../../service/auth';
import styles from './fillInfo.module.css'
interface FillInforField {

    salutation: string;

    knowOfConference: string;
    supportOrganization: string;
    advertisement: string;
    otherKnowOfConference: string;

    // interest: string;
    otherInterest: string;
    interestCheckbox:string[]

    agreementOfCollection: boolean;
    agreementOfShow: boolean;
    agreementOfReceiveInformation: boolean;

}

export function FillInfo(props:any) {
    const defaultValues:FillInforField = {
        salutation: "",
        knowOfConference: "",
        supportOrganization: "", 
        advertisement: "",
        otherKnowOfConference: "",
        // interest: "",
        interestCheckbox:[],
        agreementOfCollection: true,
        agreementOfShow: true,
        agreementOfReceiveInformation: true,
        otherInterest: ""
    }
    const { register, handleSubmit, watch, control } = useForm({defaultValues});
    const [interestCheckbox, setInterestCheckbox] = useState<string[]>([])
    const [isOtherInterest, setIsOtherInterest] = useState<boolean>(false)
    const [isSupportKnowOfConference, setIsSupportKnowOfConference] = useState<boolean>(false)
    useEffect(()=>{
        let watchValue = watch("knowOfConference")
        if(watchValue === "Others" || watchValue === "Advertisement" || watchValue === "Supporting Organization"){
            setIsSupportKnowOfConference(true)
        }else{
            setIsSupportKnowOfConference(false)
        }
    },[watch("knowOfConference")])
    const history = useHistory()
    const handleCheckboxChange = (e:React.FormEvent<HTMLInputElement>) =>{
        let newData = interestCheckbox;
        let valueName = e.currentTarget.name
        let valueChecked = e.currentTarget.checked
        if(valueChecked){
            if(newData.indexOf(valueName) === -1){
                if(valueName === "Others"){
                    setIsOtherInterest(true)
                }
                newData.push(valueName)
            }
        }else{
            let itemIndex = newData.indexOf(valueName)
            if(itemIndex !== -1){
                if(valueName === "Others"){
                    setIsOtherInterest(false)
                }
                newData.splice(itemIndex, 1)
            }
        }
        // console.log("newData", newData)
        setInterestCheckbox(newData)
    }
    const onSubmit = async(values:FillInforField) =>{
        // values.interests = interestCheckbox

        // console.log("values.knowOfConference", values.knowOfConference)
        // if(values.knowOfConference === "Others"){
        //     values.knowOfConference = "Others-" + values.otherKnowOfConference
        // }else if(values.knowOfConference === "Supporting Organization"){
        //     values.knowOfConference = "Supporting Organization-" + values.supportOrganization
        // }else if(values.knowOfConference === "Online Ads"){
        //     values.knowOfConference = "Online Ads-" + values.onlineAds
        // }
        // if(values.interest === "Others"){
        //     values.interest = "Others-" + values.otherInterest
        // }
        values.interestCheckbox = interestCheckbox

        if(values.interestCheckbox.length < 1){
            return alert("Please select at least 1 interest")
        }

        alert("Thank you for your registration.")
        // alert(JSON.stringify(values))
        try {
            await FillUserInfo(values)
            history.push("/2020fintech/")
            history.go(0);
        } catch (error) {
            alert("Server Error")
        }


    }

    const useStyles = makeStyles((theme) => ({
        paper: {
        //   marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent:"center",
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.primary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(3),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
      }));
      const classes = useStyles();

    return (
        <>
            {
                // step === 1 &&
                <>
                    {/* <h1>Step 1</h1> */}
                    <Container component="main" maxWidth="md">
                        <CssBaseline />
                        <div className={classes.paper}>
                            {/* <Avatar className={classes.avatar}>
                            <InfoOutlined />
                            </Avatar> */}
                            <Typography component="h1" variant="h5">
                            Please fill-in your information
                            </Typography>
                            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                            <Typography variant="h6">Personal Information</Typography>
                            <Grid container spacing={2}>
                                <Grid item md={2}>
                                    <Controller
                                        as={
                                            <TextField
                                                select
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="Salutation"
                                                inputProps={{ name: "salutation", id: "outlined-age-simple" }}
                                                defaultValue=""
                                            >
                                                <MenuItem value="" disabled>None</MenuItem>
                                                <MenuItem value={"Prof"}>Prof</MenuItem>
                                                <MenuItem value={"Dr"}>Dr</MenuItem>
                                                <MenuItem value={"Mr"}>Mr</MenuItem>
                                                <MenuItem value={"Ms"}>Ms</MenuItem>
                                            </TextField>
                                        }
                                        name="salutation"
                                        control={control}
                                    />

                                </Grid>
                                <Grid item md={5} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        inputRef={register({ required: true, maxLength: 20 })}
                                    />
                                </Grid>
                                <Grid item md={5} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                        inputRef={register({ required: true, maxLength: 20 })}
                                    />
                                </Grid>

                                <Grid item md={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="organization"
                                        label="Company / Organization"
                                        name="organization"
                                        inputRef={register({ required: true, maxLength: 50 })}
                                    />
                                </Grid>

                                <Grid item md={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="jobTitle"
                                        label="Job Title"
                                        name="jobTitle"
                                        inputRef={register({ required: true, maxLength: 50 })}
                                    />
                                </Grid>
                                
                                <Grid item md={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="contactEmail"
                                        label="Contact Email"
                                        name="contactEmail"
                                        inputRef={register({ required: true, maxLength: 50 })}
                                    />
                                </Grid>

                                <Grid item md={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="contactNumber"
                                        label="Contact Number"
                                        name="contactNumber"
                                        inputRef={register({maxLength: 50 })}
                                    />
                                </Grid>

                                <Grid item md={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="areaCode"
                                        label="Area Code (If you are not in Hong Kong)"
                                        name="areaCode"
                                        inputRef={register({maxLength: 50 })}
                                    />
                                    <br/>
                                    <br/>
                                </Grid>

                                <Grid item container spacing={2}>

                                <Grid item md={12}>
                                    <Typography variant="h6">Where did you know about this conference? * </Typography>
                                </Grid>
                                <Grid item md={isSupportKnowOfConference ? 6 : 12}>
                                    
                                    {/* <FormLabel component="legend">Where did you know about this conference? * </FormLabel> */}
                                    <Controller
                                        as={
                                            <TextField
                                                select
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="Source"
                                                inputProps={{ name: "knowOfConference", id: "outlined-age-simple" }}
                                                defaultValue=""
                                            >
                                                <MenuItem value="" disabled>None</MenuItem>
                                                <MenuItem value={"CUHK Staff Mass Mailing"}>CUHK Staff Mass Mailing</MenuItem>
                                                <MenuItem value={"CUHK Student Mass Mailing"}>CUHK Student Mass Mailing</MenuItem>
                                                <MenuItem value={"CUHK Alumni Email"}>CUHK Alumni Email</MenuItem>
                                                <MenuItem value={"Invitation Email from Organizer"}>Invitation Email from Organizer</MenuItem>
                                                <MenuItem value={"Sponsor - Hang Seng Bank"}>Sponsor - Hang Seng Bank</MenuItem>
                                                <MenuItem value={"Supporting Organization"}>Supporting Organization</MenuItem>
                                                <MenuItem value={"Advertisement"}>Advertisement</MenuItem>
                                                <MenuItem value={"Others"}>Others</MenuItem>
                                            </TextField>
                                        }
                                        name="knowOfConference"
                                        control={control}
                                    />
                                </Grid>
                                <Grid item md={6}>

                                    {
                                        watch("knowOfConference") === "Supporting Organization" &&
                                        <Controller
                                            as={
                                                <TextField
                                                    select
                                                    // style={{marginLeft:"10px"}}
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    label="Please specify organization"
                                                    inputProps={{ name: "supportOrganization", id: "outlined-age-simple" }}
                                                    defaultValue=""
                                                >
                                                    <MenuItem value="" disabled>None</MenuItem>
                                                    <MenuItem value={"CFA Society Hong Kong"}>CFA Society Hong Kong</MenuItem>
                                                    <MenuItem value={"The Chartered Institute of Management Accountants"}>The Chartered Institute of Management Accountants</MenuItem>
                                                    <MenuItem value={"Finnovasia"}>Finnovasia</MenuItem>
                                                    <MenuItem value={"Fintech Association of Hong Kong"}>Fintech Association of Hong Kong</MenuItem>
                                                    <MenuItem value={"The Hong Kong Institute of Bankers"}>The Hong Kong Institute of Bankers</MenuItem>
                                                    <MenuItem value={"Hong Kong Institute of Certified Public Accountants"}>Hong Kong Institute of Certified Public Accountants</MenuItem>
                                                    <MenuItem value={"InvestHK FintechHK"}>InvestHK FintechHK</MenuItem>
                                                    <MenuItem value={"Society of Registered Financial Planners"}>Society of Registered Financial Planners</MenuItem>
                                                </TextField>
                                            }
                                            name="supportOrganization"
                                            control={control}
                                        />
                                    }

                                    {
                                        watch("knowOfConference") === "Advertisement" &&
                                        <Controller
                                            as={
                                                <TextField
                                                    select
                                                    // style={{marginLeft:"10px"}}
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    label="Please specify advertisement"
                                                    inputProps={{ name: "advertisement", id: "outlined-age-simple" }}
                                                    defaultValue=""
                                                >
                                                    <MenuItem value="" disabled>None</MenuItem>
                                                    <MenuItem value={"Google"}>Google</MenuItem>
                                                    <MenuItem value={"Linkedin"}>Linkedin</MenuItem>
                                                    <MenuItem value={"Hong Kong Economic Journal 信報財經新聞有限公司"}>Hong Kong Economic Journal 信報財經新聞有限公司</MenuItem>
                                                    <MenuItem value={"HKET 香港經濟日報"}>HKET 香港經濟日報</MenuItem>
                                                </TextField>
                                            }
                                            name="advertisement"
                                            control={control}
                                        />
                                    }

                                    {

                                        watch("knowOfConference") === "Others" &&
                                        <Controller as={
                                            <TextField 
                                                required
                                                // style={{marginLeft:"10px"}}
                                                fullWidth
                                                label="Please specify"
                                                // placeholder = "Please specify"
                                                variant="outlined"
                                            />
                                        } name="otherKnowOfConference" control={control} />
                                    }
                                </Grid>
                                </Grid>

                                <Grid item md={12}>
                                <Typography variant="h6">Interest (Please select at least 1 interest) * </Typography>
                                <FormControl component="fieldset" >
                                    {/* <FormLabel component="legend">Interest (Please select at least 1 interest)</FormLabel> */}
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={<Checkbox onChange={handleCheckboxChange} name="AI and Machine Learning" color="primary" required = {interestCheckbox === [] ? true : false}/>}
                                            label="AI and Machine Learning"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox onChange={handleCheckboxChange} name="Big Data Analytics" color="primary"/>}
                                            label="Big Data Analytics"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox onChange={handleCheckboxChange} name="Cybersecurity" color="primary"/>}
                                            label="Cybersecurity"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox onChange={handleCheckboxChange} name="STO/Tokenization/Virtual Assets" color="primary"/>}
                                            label="STO/Tokenization/Virtual Assets"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox onChange={handleCheckboxChange} name="FinTech in the Banking/Virtual Banking" color="primary"/>}
                                            label="FinTech in the Banking/Virtual Banking"
                                        />
                                        <FormControlLabel
                                            label={
                                                <div className={styles.sameLine}>
                                                <span className="MuiTypography-body1">Others</span>
                                                <Controller as={
                                                    <TextField
                                                        required = {isOtherInterest}
                                                        // required = {interestCheckbox.length > 0 ? false : true}
                                                        style={{ marginLeft: "10px" }}
                                                        placeholder="Please specify"
                                                    />
                                                    } name="otherInterest" control={control} 
                                                />
                                                </div>
                                            }
                                            control={
                                                <div className={styles.sameLine}>
                                                    <Checkbox onChange={handleCheckboxChange} name="Others" color="primary" />
                                                </div>  
                                            }
                                            
                                        />
                                    </FormGroup>
                                </FormControl>
                                    <br/>
                                    <br/>
                                </Grid>
                                
                                <Grid item md={12}>
                                    <Typography variant="h6">Personal Information Collection Statement</Typography>
                                    <Typography variant="body2" gutterBottom>The personal data collected will be used by The Chinese University of Hong Kong for processing the captioned event.  The Organizers may send you news and follow-up emails.  All personal data you provided will not be disclosed to any third party unless with your prior consent.</Typography>
                                    <Controller
                                        name="agreementOfCollection"
                                        control={control}
                                        render={(props) => (
                                            <>
                                                <div className={styles.sameLine}>
                                                <Checkbox
                                                    onChange={(e) => props.onChange(e.target.checked)}
                                                    checked={props.value} 
                                                    required
                                                />
                                                <FormLabel component="legend">I agree to the personal information collection statement. *</FormLabel>
                                                </div>
                                            </>
                                        )}
                                    />  
                                    <Controller
                                        name="agreementOfShow"
                                        control={control}
                                        render={(props) => (
                                            <>
                                                <div className={styles.sameLine}>
                                                <Checkbox
                                                    onChange={(e) => props.onChange(e.target.checked)}
                                                    checked={props.value} 
                                                />
                                                <FormLabel component="legend">I would like to show my name and organization in the Meet the Other Participants page.</FormLabel>
                                                </div>
                                            </>
                                        )}
                                    />  
                                    <Controller
                                        name="agreementOfReceiveInformation"
                                        control={control}
                                        render={(props) => (
                                            <>
                                                <div className={styles.sameLine}>
                                                <Checkbox
                                                    onChange={(e) => props.onChange(e.target.checked)}
                                                    checked={props.value} 
                                                />
                                                <FormLabel component="legend">I would like to receive information of the Organizers’ future events.</FormLabel>
                                                </div>
                                            </>
                                        )}
                                    />  
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                            </form>
                        </div>
                        {/* <Box mt={5}>
                            <Copyright />
                        </Box> */}
                        </Container>
                </>
            }
            {/* {
                step === 2 &&
                <>
                    <h1>Step 2</h1>
                </>
            }
            {
                step === 3 &&
                <>
                    <h1>Step 3</h1>
                </>
            } */}
        </>
    )
}



