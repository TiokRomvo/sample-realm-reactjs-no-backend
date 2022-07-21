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
import GoogleIcon from '@mui/icons-material/Google';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
}));

const ViaXSignIn = () => {
  const usersAddLink = 'http://localhost:4000/api/auth/login';
  const [theEmail, setTheEmail] = useState();
  const [thePassword, setThePassword] = useState();
  const [snackBarOpen, setIsSnackBarOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState();
  const login = () => {
      const data ={
        "email": theEmail,
        "password": thePassword,
      }
        axios.post(usersAddLink, data).then(res => {
            setIsSnackBarOpen(true);
            setInfoMessage(res.message.toString())
        }).catch(err => {
            setIsSnackBarOpen(true);
            setInfoMessage(err.response.data.message.toString())
        })
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
    gap: '20px',
    padding: '0px 30px 0px 30px',
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
            <img src={logoUrl} />
            <div style={{    display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                textAlign: 'left', paddingLeft: 10}}>
                <span>Automate</span>
                <span>Construction</span>
                <span>Monitoring</span>
            </div>
        </div>
        <div style={{paddingBottom: 30}}>
            <div style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
           <span style={{fontSize: '20px'}}>LOGIN</span>
           <span style={{color: "red", fontSize: '26px', fontWeight: 'bold'}}>Welcome Back</span>
           </div>
        </div>
        </>
    )
}

const formInput = () => {
    return (
    <>
        <div style={formControlStyle}>
            <TextField style={{textBoxStyle}} onChange={e=> setTheEmail(e.target.value)} id="outlined-basic" label="Email Or Username" variant="outlined" />
             <TextField type="password" style={{textBoxStyle}} onChange={e=> setThePassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" />
             
        </div>
        <div style={formControlStyle}>
            <div style={{flexDirection: 'row',
                display: 'flex',
                alignItems: 'center'}}>
            <FormControlLabel
                label="Show password"
                style={{width: '100%'}}
                control={<Checkbox defaultValue={false} />}/>
                <span style={{color: 'red',
                width: '100%', textAlign: 'right',fontWeight: 'bold'}}>Forgot password?</span>
            </div>
            <Button variant="contained" style={{backgroundColor:"rgb(35, 182, 216)"}} onClick={() => login()}>Login</Button>
            <span>OR</span>
            <Button variant="contained" style={{backgroundColor:"rgb(235, 87, 87)"}}  startIcon={<GoogleIcon color="white"/>} onClick={() => register()}>Login with Google</Button>
            <span>Not on Viact yet? <a href="/?request=signUp" style={{color: 'red', fontSize: "20px", fontWeight: 'bold'}}>Signup</a> now.</span>
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
                    gap: 1,
                    minWidth: '800px',
                    minHeight: '600px',
                    maxWidth: '90%',
                    maxHeight: '80%',
                    padding: 10,
                    borderRadius: '10px'
                  }}
                >
                    <Item style={{borderRadius: '10px', padding: '30px'}} elevation={0}>
                        {formInfo()}
                        {formInput()}
                    </Item>
            </Box>
            </div>
        </div>
    </div>
};
export default ViaXSignIn;
