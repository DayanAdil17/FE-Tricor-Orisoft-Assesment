import React from "react";
import {
  Typography,
  Grid,
  TextField,
  Card,
  Button,
  Paper,
  Alert,
  Snackbar
} from "@mui/material";


import axios from "axios";


let saveAnimation;

function Register() {
    const [email, setEmail] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirmation, setPasswordConfirmation] = React.useState("");    
    const [showSnack, setShowSnack] = React.useState(false);

    const [emailValid, setEmailValid] = React.useState(false);
    const [emailValidEmpty, setEmailValidEmpty] = React.useState(false);
    const [userNameValid, setUserNameValid] = React.useState(false);
    const [userNameValidEmpty, setUserNameValidEmpty] = React.useState(false);
    const [passwordValid, setPasswordValid] = React.useState(false);
    const [passwordValidEmpty, setPasswordValidEmpty] = React.useState(false);
    const [passwordConfirmationValid, setPasswordConfirmationValid] = React.useState(false);
    const [passwordConfirmationValidEmpty, setPasswordConfirmationValidEmpty] = React.useState(false);
    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setShowSnack(false);
        window.location.href='/'
    };

    const regist = (event) => {
        event.preventDefault();

        let EmailExtention = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/     
        let regex = /^[0-9a-zA-Z(\-)]+$/   
        let emailValidation = false;
        let emailValidationEmpty = false;
        let userNameValidation = false;
        let userNameValidationEmpty = false;
        let passwordValidation = false;
        let passwordValidationEmpty = false;
        let passwordConfirmationValidation = false;
        let passwordConfirmationValidationEmpty = false

        let data = {
        // detail:detail,
        // extension:detailExtension,
        // detailid    :   detailcategories[0].sub_id,
        // preview     :   imagesFile
        email: "dummy999@mail.com",
        username: "dummy",
        password: "dummyPassword",
        password_confirmation: "dummyPassword",
        // newUserPassword : newUserPassword
        };

        // axios
        //   .post("https://polls.apiblueprint.org/auth/register", data, {
        //     headers: {
        //         "content-type": "aplication/json"
        //     }
        //   })
        //   .then(({ data }) => {
        //     console.log(data, "Result");
        //     window.location.href = "/Register";
        //   })
        //   .catch((error) => {
        //     console.log("error", error.response.data);
        //   });
        if(EmailExtention.exec(email)){
            setEmailValid(false)
            emailValidation = false
        }else{
            setEmailValid(true)
            emailValidation=true
        }if(email == ""){
            setEmailValidEmpty(true)
            emailValidationEmpty = true
        }else{
            setEmailValidEmpty(false)
            emailValidationEmpty = false
        }if(regex.exec(userName)){
            setUserNameValid(false)
            userNameValidation = false
        }else{
            setUserNameValid(true)
            userNameValidation = true
        }if(userName == ""){
            setUserNameValidEmpty(true)
            userNameValidationEmpty = true
        }else{
            setUserNameValidEmpty(false)
            userNameValidationEmpty = false
        }if(regex.exec(password)){
            setPasswordValid(false)
            passwordValidation = false
        }else{
            setPasswordValid(true)
            passwordValidation = true
        }if(password == ""){
            setPasswordValidEmpty(true)
            passwordValidationEmpty = true
        }else{
            setPasswordValidEmpty(false)
            passwordValidationEmpty = false
        }if(passwordConfirmation == ""){
            setPasswordConfirmationValidEmpty(true)
            passwordConfirmationValidationEmpty = true
        }else{
            setPasswordConfirmationValidEmpty(false)
            passwordConfirmationValidationEmpty = false
        }if(password != passwordConfirmation){
            setPasswordConfirmationValid(true)
            passwordConfirmationValidation = true
        }else{
            setPasswordConfirmationValid(false)
            passwordConfirmationValidation = false
        }
        if(emailValidation == false && emailValidationEmpty == false && userNameValidation == false && userNameValidationEmpty == false && passwordConfirmationValidation == false && passwordConfirmationValidationEmpty == false && passwordValidation == false && passwordValidationEmpty == false ){
            axios({
                url: "https://private-anon-c249613a27-halfwineaid.apiary-mock.com/auth/register",
                method: "POST",
                data: {
                    email: email,
                    username: userName,
                    password: password,
                    password_confirmation: passwordConfirmation,
                }
            })
                .then(({ data }) => { 
                    setShowSnack(true)           
                    console.log("result:", data)                
                })
                .catch((err) => {
                    console.log("error axios:", err.response);
                })
            }    
    };
  return (
    <div>
        <Grid
            container
            direction={"row"}
            justifyContent="center"
            alignItems={"center"}
            spacing={2}
        >
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Paper
                    style={{
                    padding: "15px",
                    backgroundColor: "#f2bda0",
                    width: "50%",
                    margin: "auto",
                    marginTop: "10vw",
                    }}
                    elevate={4}
                >
                    <Grid
                    container
                    direction="row"
                    alignItems={"center"}
                    justifyContent="center"
                    spacing={1}
                    >
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Typography variant="h3" textAlign={"center"}>
                                Register Account
                            </Typography>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            {(()=>{
                                if(emailValidEmpty == true){
                                    return(
                                        <TextField
                                        error
                                        label="Email"
                                        value={email}
                                        onChange={(event) => {
                                            setEmail(event.target.value);
                                        }}
                                        style={{ width: "100%" }}
                                        helperText="Please input your Email!"
                                    />
                                    )
                                }else if(emailValid == true){
                                    return(
                                        <TextField
                                        error
                                        label="Email"
                                        value={email}
                                        onChange={(event) => {
                                            setEmail(event.target.value);
                                        }}
                                        style={{ width: "100%" }}
                                        helperText="Your Email input is invalid!"
                                    />
                                    )
                                }else{
                                    return(
                                        <TextField                                        
                                        label="Email"
                                        value={email}
                                        onChange={(event) => {
                                            setEmail(event.target.value);
                                        }}
                                        style={{ width: "100%" }}                                        
                                    />
                                    )
                                }
                            })()}
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            {(()=>{
                                if(userNameValid == true){
                                    return(                                        
                                        <TextField
                                            error
                                            label="User Name"
                                            value={userName}
                                            onChange={(event) => {
                                                setUserName(event.target.value);
                                            }}
                                            style={{ width: "100%" }}
                                            helperText="Please input your username!"
                                        />
                                    )
                                }else if(userNameValidEmpty == true){
                                    return(
                                        <TextField
                                        error
                                        label="User Name"
                                        value={userName}
                                        onChange={(event) => {
                                            setUserName(event.target.value);
                                        }}
                                        style={{ width: "100%" }}
                                        helperText="Alphanumeric only!"
                                        />
                                    )
                                }else{
                                    return(
                                        <TextField                                        
                                        label="User Name"
                                        value={userName}
                                        onChange={(event) => {
                                            setUserName(event.target.value);
                                        }}
                                        style={{ width: "100%" }}                                        
                                    />
                                    )
                                }
                            })()}
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            {(()=>{
                                if(passwordValidEmpty == true){
                                    return(
                                        <TextField
                                        error
                                        type="password"
                                        label="Password"
                                        value={password}
                                        onChange={(event) => {
                                            setPassword(event.target.value);
                                        }}
                                        style={{ width: "100%" }}
                                        helperText="Please input your password!"
                                        />
                                    )
                                }else if(passwordValid == true){
                                    return(
                                        <TextField
                                        error
                                        type="password"
                                        label="Password"
                                        value={password}
                                        onChange={(event) => {
                                            setPassword(event.target.value);
                                        }}
                                        style={{ width: "100%" }}
                                        helperText="Alphanumeric only!"
                                        />
                                    )
                                }else{
                                    return(
                                        <TextField                                        
                                        type="password"
                                        label="Password"
                                        value={password}
                                        onChange={(event) => {
                                            setPassword(event.target.value);
                                        }}
                                        style={{ width: "100%" }}                                        
                                        />
                                    )
                                }
                            })()}
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            {(()=>{
                                if(passwordConfirmationValidEmpty == true){
                                    return(
                                        <TextField
                                        error
                                        type="password"
                                        label="Password Confirmation"
                                        value={passwordConfirmation}
                                        onChange={(event) => {
                                            setPasswordConfirmation(event.target.value);
                                        }}
                                        style={{ width: "100%" }}
                                        helperText="Please input your password again!"
                                        />
                                    )
                                }else if(passwordConfirmationValid == true){
                                    return(
                                        <TextField
                                        error
                                        type="password"
                                        label="Password Confirmation"
                                        value={passwordConfirmation}
                                        onChange={(event) => {
                                            setPasswordConfirmation(event.target.value);
                                        }}
                                        style={{ width: "100%" }}
                                        helperText="Your password does not match!"
                                        />
                                    )
                                }else{
                                    return(
                                        <TextField                                        
                                        type="password"
                                        label="Password Confirmation"
                                        value={passwordConfirmation}
                                        onChange={(event) => {
                                            setPasswordConfirmation(event.target.value);
                                        }}
                                        style={{ width: "100%" }}
                                        />
                                    )
                                }
                            })()}
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <a href="/">
                            <Button
                                variant="contained"
                                style={{
                                float: "left",
                                backgroundColor: "#80deea",
                                color: "#222222",
                                }}
                            >
                                Back
                            </Button>
                            </a>
                            <form method="post" onSubmit={regist}>
                            <Button
                                variant="contained"
                                type="submit"
                                style={{
                                float: "right",
                                backgroundColor: "#80deea",
                                color: "#222222",
                                }}
                            >
                                Register
                            </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Paper>                
                <Snackbar open={showSnack} anchorOrigin={{ vertical:'top',horizontal: 'center' }} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Your Account has been saved
                    </Alert>
                </Snackbar>
            </Grid>
        </Grid>        
    </div>
  );
}

export default Register;
