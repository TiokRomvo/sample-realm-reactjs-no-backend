import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import axios from "axios";
import backgroundImageUrl from './auth-bg.256b7710.png'
import logoUrl from './logo-color.1ab1dfe3.svg'
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
}));

const ViaXSignUp = () => {
  const usersAddLink = 'http://localhost:4000/api/auth/register';
  const [theFirstName, setTheFirstName] = useState();
  const [theLastName, setTheLastName] = useState();
  const [theEmail, setTheEmail] = useState();
  const [theUserName, setTheUserName] = useState();
  const [thePassword, setThePassword] = useState();
  const [theConfirmPassword, setTheConfirmPassword] = useState();
  const [thePhone, setThePhone] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [snackBarOpen, setIsSnackBarOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState();
  const register = () => {
    if(thePassword === theConfirmPassword) {
        if(theFirstName && theLastName)
        {
            const data ={
                "name": theFirstName.concat(theLastName),
                "username": theUserName,
                "email": theEmail,
                "password": thePassword,
                "phone": thePhone,
            }
                axios.post(usersAddLink, data).then(res => {
                    setIsSnackBarOpen(true);
                    setInfoMessage(res.message.toString())
                }).catch(err => {
                    var error = "API refuse to work";
                    try {
                        error = err.response.data.message.toString();
                    } catch(ex) {

                    }
                    setIsSnackBarOpen(true);
                    setInfoMessage(error)
                })
        } else {
            setIsSnackBarOpen(true);
            setInfoMessage("First name and last name are empty");
        }
    } else {
        setIsSnackBarOpen(true);
        setInfoMessage("Confirm password not match");
    }
  }
const formInfoHeaderBox = {
    display: 'flex',
    flexDirection: 'row',
    color: '#EB5757',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20
}
const formControlStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
}
const backgroundStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundRepeat: 'repeat',
    minHeight: '100vh',
    backgroundColor: "#0b454f"
}
const textBoxStyle = {
    width: '100%'
}

const formInfo = () => {
    return (
        <>
        <div style={formInfoHeaderBox}>
            <img src={logoUrl}/>
            <div style={{    display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                textAlign: 'left', paddingLeft: 10}}>
                <span>Automate</span>
                <span>Construction</span>
                <span>Monitoring</span>
            </div>
        </div>
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
           <span style={{fontSize: '20px'}}>CREATE NEW ACCOUNT</span>
           <span style={{color: "#EB5757", fontSize: '20px', fontWeight: 'bold'}}>Build smart risk free</span>
           </div>
           <ul style={{
            display: 'flex',
            gap: '20px',
            flexDirection: 'column',
            textAlign: 'left'
           }}>
            <li>Understand why Viact is being used on millions of customers everyday</li>
            <li>Find out if Viact is the right fit for your business</li>
            <li>Get all your questions answered (personally)</li>
            <li>Completely risk-free with 14-day free trial and a 30-day money back guarantee!</li>
           </ul>
        </div>
        </>
    )
}

const formInput = () => {
    return (
    <>
        <div style={{display: 'flex',
            gap: '10px',
            flexDirection: 'column'}}>
             <TextField label={<span>First Name <span style={{color:'red'}}>*</span></span>} style={{textBoxStyle}} onChange={e=> setTheFirstName(e.target.value)} id="outlined-basic" variant="outlined" />
             <TextField label={<span>Last Name <span style={{color:'red'}}>*</span></span>} style={{textBoxStyle}} onChange={e=> setTheLastName(e.target.value)} id="outlined-basic" variant="outlined" />
             <TextField label={<span>Username <span style={{color:'red'}}>*</span></span>} style={{textBoxStyle}} onChange={e=> setTheUserName(e.target.value)} id="outlined-basic" variant="outlined" />
             <TextField label={<span>Email <span style={{color:'red'}}>*</span></span>} type="email" style={{textBoxStyle}} onChange={e=> setTheEmail(e.target.value)} id="outlined-basic" variant="outlined" />
             <TextField label="Phone" type="number" style={{textBoxStyle}} onChange={e=> setThePhone(e.target.value)} id="outlined-basic" variant="outlined" />
             <TextField label={<span>Password <span style={{color:'red'}}>*</span></span>} type={isChecked ? "text" : "password"} style={{textBoxStyle}} onChange={e=> setThePassword(e.target.value)} id="outlined-basic" variant="outlined" />
             <TextField label={<span>Confirm Password <span style={{color:'red'}}>*</span></span>} type={isChecked ? "text" : "password"} style={{textBoxStyle}} onChange={e=> setTheConfirmPassword(e.target.value)} id="outlined-basic" variant="outlined" />
        </div>
        <div style={formControlStyle}>
            <FormControlLabel
                label="Show password"
                control={<Checkbox onChange={()=> setIsChecked(!isChecked)} defaultValue={false} />}/>
            <Button variant="contained" onClick={() => register()}>Sign Up</Button>
            <span>By clicking Sign up or Continue with Google, you agree to viAct’s <span style={{color: 'red', fontWeight: 'bold'}}>Terms and Conditions for Free Trial</span>.</span>
            <span>Already have an account? <a href="?request=" style={{color: 'red', fontWeight: 'bold'}}>Log In</a>.</span>
        </div>
    </>
    )
}
  return <div className="App">
    <Snackbar
    open={snackBarOpen}
    autoHideDuration={6000}
    onClose={() => setIsSnackBarOpen(false)}
    >
          <Alert severity="info">{infoMessage}</Alert>
    </Snackbar>
    <div style={backgroundStyle}>
        <div>
            <Box
                 sx={{
                    p: 2,
                    bgcolor: 'white',
                    display: 'grid',
                    gridTemplateColumns: { md: '1fr 1fr' },
                    gap: 2,
                    minWidth: '600px',
                    minHeight: '500px',
                    maxWidth: '1000px',
                    maxHeight: '1000px',
                    borderRadius: '10px'
                  }}
                >
                    <Item style={{borderRadius: '0px', borderRight: '1px solid lightgray'}} elevation={0}>
                        {formInfo()}
                    </Item>
                    <Item elevation={0}>
                        {formInput()}
                    </Item>
            </Box>
            </div>
        </div>
    </div>
};
export default ViaXSignUp;
