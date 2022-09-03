import React from 'react';
import ReactDOM from 'react-dom';
import AUser  from "./AUser";
import ShareVideos  from "./ShareVideos";
import ViaXSignUp  from "./ViaXSignUp";
import ViaXSignUp  from "./ViaXSignUp";
import ViaXSignIn  from "./ViaXSignIn";
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const {request} = params;
 ReactDOM.render(<React.StrictMode>
  {
    request === "aUser" ?
    <AUser/> :
    request === "videos" ?
    <ShareVideos/> :
    request === "viaXSignUp" ?
    <ViaXSignUp/> :
    request === "viaXSignIn" ?
    <ViaXSignIn/> :
    <UserRegistration/>
  }
</React.StrictMode>, document.getElementById('root'));
