import { Input } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select/Select';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { FillUserInfo } from '../../service/auth';

export function FillInfo(props:any) {
    const defaultValues = {
        knowOfConference: "",
        supportOrganization: "", 
        onlineAds: "",
        others: ""
    }
    const { register, handleSubmit, watch, errors, control } = useForm({defaultValues});
    // const [knowOfConference, setKnowOfConference] = useState<string>("other")
    const [interestCheckbox, setInterestCheckbox] = useState<string[]>([])
    const history = useHistory()
    const [step, setStep] = useState<number>(1)

    useEffect(()=>{
        console.log("knowOfConference", watch("knowOfConference"))
    },[watch("knowOfConference")])

    const onSubmit = async(values:any) =>{
        values.interests = interestCheckbox

        // console.log("values.knowOfConference", values.knowOfConference)
        // if(knowOfConference === "Others"){
        //     values.knowOfConference = "Others-" + values.knowOfConference
        // }else if(knowOfConference === "Supporting Organization"){
        //     values.knowOfConference = "Supporting Organization-" + values.knowOfConference
        // }else if(knowOfConference === "Online Ads"){
        //     values.knowOfConference = "Online Ads-" + values.knowOfConference
        // }else{
        //     values.knowOfConference = knowOfConference
        // }

        // if(knowOfConference !== "Others" && knowOfConference !== "Supporting Organization"  && knowOfConference !== "Online Ads"){
        //     values.knowOfConference = knowOfConference
        // }
        
        // if(values.interests.length < 3){
        //     return alert("Please select at least 3 interest")
        // }

        alert(JSON.stringify(values))
        // try {
        //     const res = await FillUserInfo(values)
        //     history.push("/")
        //     history.go(0);
        // } catch (error) {
        //     alert("Server Error")
        // }


    }
    // console.log(watch("example")); 
    const handleKnowOfConferenceChange = (e:React.FormEvent<HTMLInputElement>) =>{
        let value = e.currentTarget.value
        // setKnowOfConference(value)
    }
    const handleCheckboxChange = (e:React.FormEvent<HTMLInputElement>) =>{
        let newData = interestCheckbox;
        let valueName = e.currentTarget.name
        let valueChecked = e.currentTarget.checked
        if(valueChecked){
            if(newData.indexOf(valueName) === -1){
                newData.push(valueName)
            }
        }else{
            let itemIndex = newData.indexOf(valueName)
            if(itemIndex != -1){
                newData.splice(itemIndex, 1)
            }
        }
        console.log("newData", newData)
        return setInterestCheckbox(newData)
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
                step === 1 &&
                <>
                    <h1>Step 1</h1>
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
                                </Grid>

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
                                            />
                                        } name="others" control={control} />
                                    }

                                </Grid>


                              <Grid item md={12}>
                                <FormControl component="fieldset" >
                                    <FormLabel component="legend">Interest (Please select 3 interests)</FormLabel>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={<Checkbox onChange={handleCheckboxChange} name="gilad" color="primary"/>}
                                            label="Gilad Gray"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox onChange={handleCheckboxChange} name="jason" color="primary"/>}
                                            label="Jason Killian"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox onChange={handleCheckboxChange} name="antoine" color="primary"/>}
                                            label="Antoine Llorca"
                                        />
                                    </FormGroup>
                                </FormControl>
                                </Grid>
                                <Grid item md={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
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
                            {/* <Grid container justify="flex-end">
                                <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                                </Grid>
                            </Grid> */}
                            </form>
                        </div>
                        {/* <Box mt={5}>
                            <Copyright />
                        </Box> */}
                        </Container>
                </>
            }
            {
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
            }
        </>
    )
}



