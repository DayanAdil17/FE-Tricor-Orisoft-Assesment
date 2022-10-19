import React from 'react'
import {
    Typography,
    Grid,
    TextField,
    Card,
    Button,
    Paper,
    Alert,
    Snackbar

} from '@mui/material'
import axios from "axios";
import { styled, useTheme } from '@mui/material/styles';

function Login() {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const [emailValid, setEmailValid] = React.useState(false);
    const [emailValidEmpty, setEmailValidEmpty] = React.useState(false);
    const [passwordValid, setPasswordValid] = React.useState(false);
    const [passwordValidEmpty, setPasswordValidEmpty] = React.useState(false);
    const [token, setToken] = React.useState("")

    const login = (event) => {
        event.preventDefault();
    
        let EmailExtention = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/     
        let regex = /^[0-9a-zA-Z(\-)]+$/   
        let emailValidation = false;
        let emailValidationEmpty = false;        
        let passwordValidation = false;
        let passwordValidationEmpty = false;           
            
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
        }
        if(emailValidation == false && emailValidationEmpty == false && passwordValidation == false && passwordValidationEmpty == false ){
            axios({
                url: "https://private-anon-c249613a27-halfwineaid.apiary-mock.com/auth/login",
                method: "POST",
                data: {
                    email: email,                    
                    password: password,                    
                }
            })
                .then(({ data }) => { 
                           
                    console.log("result:", data) 
                    localStorage.setItem('token', data.access_token)
                    window.location.href='/Dashboard'               
                })
                .catch((err) => {
                    console.log("error axios:", err.response);
                })
        }                        
    };
  return (
    <div>
        <Grid container direction={'row'} justifyContent="center" alignItems={'center'} spacing={2}>            
            <Grid item xl = {12} lg ={12} md = {12} sm = {12} xs ={12}>
                <Paper style = {{padding:'15px', backgroundColor:'#f2bda0',
                 width:'50%', margin:'auto', marginTop:'10vw'}} elevate={4}>
                    <Grid container direction = 'row' alignItems={"center"} justifyContent='center' spacing = {1}>
                        <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>
                            <Typography variant='h3' textAlign={'center'}>
                                Welcome to Diary
                            </Typography>
                            <Typography variant='h4' textAlign={'center'}>
                                Please Login
                            </Typography>
                        </Grid>
                        <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>
                            {(()=>{
                                if(emailValidEmpty == true){
                                    return(
                                        <TextField error helperText="Please input your email!" label = "Email" value={email} onChange={(event)=>{setEmail(event.target.value)}} style={{width:'100%', borderBlockColor:'#f8bbd0'}} />
                                    )
                                }else if(emailValid == true){
                                    return(
                                        <TextField error helperText="Your email input is invalid!" label = "Email" value={email} onChange={(event)=>{setEmail(event.target.value)}} style={{width:'100%', borderBlockColor:'#f8bbd0'}} />
                                    )
                                }else if(emailValid == false && emailValidEmpty == false){
                                    return(
                                        <TextField label = "Email" value={email} onChange={(event)=>{setEmail(event.target.value)}} style={{width:'100%', borderBlockColor:'#f8bbd0'}} />
                                    )
                                }
                            })()}
                        </Grid>                        
                        <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>
                            {(()=>{
                                if(passwordValidEmpty == true){
                                    return(
                                        <TextField type={'password'} error helperText="Please input your password!" label = "Password" value={password} onChange={(event)=>{setPassword(event.target.value)}} style={{width:'100%'}} />
                                    )
                                }else if(passwordValid == true){
                                    return(
                                        <TextField type={'password'} error helperText="Alphanumeric only!" label = "Password" value={password} onChange={(event)=>{setPassword(event.target.value)}} style={{width:'100%'}} />
                                    )
                                }else if(passwordValid == false && passwordValidEmpty == false){
                                    return(
                                        <TextField type={'password'} label = "Password" value={password} onChange={(event)=>{setPassword(event.target.value)}} style={{width:'100%'}} />
                                    )
                                }
                            })()}
                        </Grid>
                        <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>
                           <a href='/Register'>
                                <Button variant = 'contained' style={{float:'left', backgroundColor:'#80deea', color:'#222222'}}>
                                    Register
                                </Button>
                           </a>
                            <form method='post' onSubmit={login}>
                                <Button type='submit' variant = 'contained' style={{float:'right', backgroundColor:'#80deea', color:'#222222'}}>
                                    Login
                                </Button>
                            </form>
                        </Grid>
                       
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    </div>
  )
}

export default Login