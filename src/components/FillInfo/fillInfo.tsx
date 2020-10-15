// import { Input } from '@material-ui/core';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
// import FormControl from '@material-ui/core/FormControl/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
// import InputLabel from '@material-ui/core/InputLabel/InputLabel';
// import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select/Select';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// import { Label } from '@material-ui/icons';
// import InfoOutlined from '@material-ui/icons/InfoOutlined';
import React, {  } from 'react'
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
// import { AppContext } from '../../contexts/firebaseContext/firebaseContext';
import { FillUserInfo } from '../../service/auth';
import styles from './fillInfo.module.css'
interface FillInforField {

    knowOfConference: string;
    supportOrganization: string;
    onlineAds: string;
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
        knowOfConference: "",
        supportOrganization: "", 
        onlineAds: "",
        otherKnowOfConference: "",
        // interest: "",
        interestCheckbox:[],
        agreementOfCollection: true,
        agreementOfShow: true,
        agreementOfReceiveInformation: true,
        otherInterest: ""
    }
    const { register, handleSubmit, watch, control } = useForm({defaultValues});
    // const [knowOfConference, setKnowOfConference] = useState<string>("other")
    const [interestCheckbox, setInterestCheckbox] = useState<string[]>([])
    const [isOtherInterest, setIsOtherInterest] = useState<boolean>(false)
    // console.log("isOtherInterest", isOtherInterest)
    const history = useHistory()
    // const [step, setStep] = useState<number>(1)

    // useEffect(()=>{
    //     console.log("knowOfConference", watch("knowOfConference"))
    // },[watch("knowOfConference")])
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
            if(itemIndex != -1){
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
            history.push("/")
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
                                <Grid item md={12} sm={6}>
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
                                <Grid item md={12} sm={6}>
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
                                        id="contactEmail"
                                        label="Contact Email"
                                        name="contactEmail"
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
                                        id="organization"
                                        label="Company / Organization"
                                        name="organization"
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

                                
                                <Typography variant="h6">Interest</Typography>
                                <Grid item md={12}>
                                    <FormLabel component="legend">Where did you know about this conference? * </FormLabel>
                                    <Controller
                                        as={
                                          
                                            <Select
                                                // style={{marginLeft:"10px"}}
                                                defaultValue=""
                                                displayEmpty
                                                required
                                                // variant="outlined"
                                            >
                                                <MenuItem value="" disabled>None</MenuItem>
                                                <MenuItem value={"CUHK Staff Mass Mailing"}>CUHK Staff Mass Mailing</MenuItem>
                                                <MenuItem value={"CUHK Student Mass Mailing"}>CUHK Student Mass Mailing</MenuItem>
                                                <MenuItem value={"CUHK Alumni Email"}>CUHK Alumni Email</MenuItem>
                                                <MenuItem value={"Invitation Email from Organizer"}>Invitation Email from Organizer</MenuItem>
                                                <MenuItem value={"Sponsor - Hang Seng Bank"}>Sponsor - Hang Seng Bank</MenuItem>
                                                <MenuItem value={"Supporting Organization"}>Supporting Organization</MenuItem>
                                                <MenuItem value={"Online Ads"}>Online Ads</MenuItem>
                                                <MenuItem value={"Others"}>Others</MenuItem>
                                            </Select>
                                        }
                                        name="knowOfConference"
                                        control={control}
                                    />

                                    {
                                        watch("knowOfConference") === "Supporting Organization" &&
                                        <Controller
                                            as={
                                                <Select
                                                    style={{marginLeft:"10px"}}
                                                    defaultValue=""
                                                    displayEmpty
                                                    required
                                                >
                                                    <MenuItem value="" disabled>None</MenuItem>
                                                    <MenuItem value={"Organization A"}>Organization A</MenuItem>
                                                    <MenuItem value={"Organization B"}>Organization B</MenuItem>
                                                    <MenuItem value={"Organization C"}>Organization C</MenuItem>
                                                </Select>
                                            }
                                            name="supportOrganization"
                                            control={control}
                                        />
                                    }

                                    {
                                        watch("knowOfConference") === "Online Ads" &&
                                        <Controller
                                            as={
                                                <Select
                                                    defaultValue=""
                                                    displayEmpty
                                                    required
                                                    style={{marginLeft:"10px"}}
                                                >
                                                    <MenuItem value="" disabled>None</MenuItem>
                                                    <MenuItem value={"Youtube"}>Youtube</MenuItem>
                                                    <MenuItem value={"Facebook"}>Facebook</MenuItem>
                                                    <MenuItem value={"Twitter"}>Twitter</MenuItem>
                                                </Select>
                                            }
                                            name="onlineAds"
                                            control={control}
                                        />
                                    }

                                    {
                                        watch("knowOfConference") === "Others" &&
                                        <Controller as={
                                            <TextField 
                                                required
                                                style={{marginLeft:"10px"}}
                                                placeholder = "Please specify"
                                            />
                                        } name="otherKnowOfConference" control={control} />
                                    }

                                </Grid>

                                {/* <Grid item md={12}>
                                    <FormLabel component="legend">Area of Interest * </FormLabel>
                                    <Controller
                                        as={
                                          
                                            <Select
                                                // style={{marginLeft:"10px"}}
                                                defaultValue=""
                                                displayEmpty
                                                required
                                                // variant="outlined"
                                            >
                                                <MenuItem value="" disabled>None</MenuItem>
                                                <MenuItem value={"AI and Machine Learning"}>AI and Machine Learning</MenuItem>
                                                <MenuItem value={"Cybersecurity / Biometrics"}>Cybersecurity/Biometrics</MenuItem>
                                                <MenuItem value={"FinTech in the Banking/Investment Banking Industry"}>FinTech in the Banking/Investment Banking Industry</MenuItem>
                                                <MenuItem value={"ICO/Tokenization / Cryptoasset"}>ICO / Tokenization / Cryptoasset</MenuItem>
                                                <MenuItem value={"Others"}>Others</MenuItem>
                                            </Select>
                                        }
                                        name="interest"
                                        control={control}
                                    />
                                    {
                                        watch("interest") === "Others" &&
                                        <Controller as={
                                            <TextField 
                                                required
                                                style={{marginLeft:"10px"}}
                                                placeholder = "Please specify"
                                            />
                                        } name="otherInterest" control={control} />
                                    }
                                    <br/>
                                    <br/>
                                </Grid> */}

                                <Grid item md={12}>
                                    
                                <FormControl component="fieldset" >
                                    <FormLabel component="legend">Interest (Please select at least 1 interest)</FormLabel>
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
                                <Typography variant="h6">Personal Information Collection Statement</Typography>
                                <Grid item md={12}>
{/*                                     
                                    <FormLabel>Personal Information Collection Statement</FormLabel> */}
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



