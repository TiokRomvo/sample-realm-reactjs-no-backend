import React, {useSearchParams} from 'react';
import ReactDOM from 'react-dom';
import UserRegistration  from "./UserRegistration";
import AUser  from "./AUser";
import ShareVideos  from "./ShareVideos";
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const {request} = params;
 ReactDOM.render(<React.StrictMode>
  {request === "aUser" ?
   <AUser/> :
   request === "videos" ?
   <ShareVideos/> :
   <UserRegistration/>
  }
</React.StrictMode>, document.getElementById('root'));
