import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { FillUserInfo } from '../../service/auth';

export function FillInfo(props:any) {
    const history = useHistory()
    const [step, setStep] = useState<number>(1)
    const { register, handleSubmit, watch, errors } = useForm();
    const [sex, setSex] = useState<string>("other")
    const [interestCheckbox, setInterestCheckbox] = useState<string[]>([])
    const onSubmit = async(values:any) =>{
        values.interests = interestCheckbox
        values.sex = sex
        // console.log("values", values)
        
        if(values.interests.length < 3){
            return alert("Please select at least 3 interest")
        }

        alert(JSON.stringify(values))
        try {
            const res = await FillUserInfo(values)
            history.push("/")
            history.go(0);
        } catch (error) {
            alert("Server Error")
        }


    }
    // console.log(watch("example")); 
    const handleSexChange = (e:React.FormEvent<HTMLInputElement>) =>{
        let valueName = e.currentTarget.name
        let value = e.currentTarget.value
        console.log("valueName", valueName)
        console.log("value", value)
        setSex(value)
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
                                {/* <Grid item md={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    inputRef={register({ required: true, maxLength: 50 })}
                                />
                                </Grid> */}
                                <Grid item md={12}>
                                    <FormControl component="fieldset" color="primary" >
                                        <FormLabel component="legend">Gender</FormLabel>
                                        <RadioGroup aria-label="gender" name="gender1" onChange={handleSexChange} color="primary">
                                            {/* row */}
                                            <FormControlLabel value="female" control={<Radio />} label="Female" color="primary"/>
                                            <FormControlLabel value="male" control={<Radio />} label="Male" color="primary"/>
                                            <FormControlLabel value="other" control={<Radio />} label="Other" color="primary"/>
                                            {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
                                        </RadioGroup>
                                    </FormControl>
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



