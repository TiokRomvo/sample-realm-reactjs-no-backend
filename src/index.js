import React, {useSearchParams} from 'react';
import ReactDOM from 'react-dom';
import ViaXSignUp  from "./ViaXSignUp";
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const {request} = params;
 ReactDOM.render(<React.StrictMode>
  {
   <ViaXSignUp/>
  }
</React.StrictMode>, document.getElementById('root'));
