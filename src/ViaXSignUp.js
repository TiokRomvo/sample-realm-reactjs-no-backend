import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import axios from "axios";
import backgroundImageUrl from './watercolor-gb79109584_1920.png'
import logoUrl from './annotation-gb790942f5_640.png'
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
}));

const ViaXSignUp = () => {
  const usersAddLink = 'http://localhost:3000/api/auth/register';
  const [theFirstName, setTheFirstName] = useState();
  const [theLastName, setTheLastName] = useState();
  const [theEmail, setTheEmail] = useState();
  const [theUserName, setTheUserName] = useState();
  const [thePassword, setThePassword] = useState();
  const [theConfirmPassword, setTheConfirmPassword] = useState();
  const [thePhone, setThePhone] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const register = () => {
    if(thePassword === theConfirmPassword) {
      const data ={
        "name": theFirstName.concat(theLastName),
        "username": theUserName,
        "email": theEmail,
        "password": thePassword,
        "phone": thePhone,
      }
        axios.post(usersAddLink, data).then(res => {
      })
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
    height: '100vh',
    backgroundColor: "#0b454f"
}
const textBoxStyle = {
    width: '100%'
}

const formInfo = () => {
    return (
        <>
        <div style={formInfoHeaderBox}>
            <img src={logoUrl} style={{width: '280px', height: '113px'}}/>
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
             <TextField style={{textBoxStyle}} onChange={e=> setTheFirstName(e.target.value)} id="outlined-basic" label="First Name" variant="outlined" />
             <TextField style={{textBoxStyle}} onChange={e=> setTheLastName(e.target.value)} id="outlined-basic" label="Last Name" variant="outlined" />
             <TextField style={{textBoxStyle}} onChange={e=> setTheUserName(e.target.value)} id="outlined-basic" label="Username" variant="outlined" />
             <TextField style={{textBoxStyle}} onChange={e=> setTheEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" />
             <TextField style={{textBoxStyle}} onChange={e=> setThePhone(e.target.value)} id="outlined-basic" label="Phone" variant="outlined" />
             <TextField style={{textBoxStyle}} onChange={e=> setThePassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" />
             <TextField style={{textBoxStyle}} onChange={e=> setTheConfirmPassword(e.target.value)} id="outlined-basic" label="Confirm Password" variant="outlined" />
        </div>
        <div style={formControlStyle}>
            <FormControlLabel
                label="Show password"
                control={<Checkbox defaultValue={false} />}/>
            <Button variant="contained" onClick={() => register()}>Sign Up</Button>
            <span>By clicking Sign up or Continue with Google, you agree to viAct’s <span style={{color: 'red', fontWeight: 'bold'}}>Terms and Conditions for Free Trial</span>.</span>
            <span>Already have an account? <span style={{color: 'red', fontWeight: 'bold'}}>Log In</span>.</span>
        </div>
    </>
    )
}
  return <div className="App">
    <div style={backgroundStyle}>
            <Box
                 sx={{
                    p: 2,
                    bgcolor: 'white',
                    display: 'grid',
                    gridTemplateColumns: { md: '1fr 1fr' },
                    gap: 2,
                    minWidth: '800px',
                    minHeight: '600px',
                    maxWidth: '90%',
                    maxHeight: '80%',
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
};
export default ViaXSignUp;
