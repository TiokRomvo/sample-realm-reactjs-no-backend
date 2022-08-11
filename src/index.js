import React from 'react';
import ReactDOM from 'react-dom';
import UserRegistration  from "./UserRegistration";
import AUser  from "./AUser";
import ShareVideos from "./ShareVideos";
import AirTableStudent from "./AirTableStudent";
import { createStore , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
const actionTypeRetrieveClassessSuccess = 'RETRIEVE_CLASSES_SUCCESS'
const actionTypeRetrieveStudentsSuccess = 'RETRIEVE_STUDENTS_SUCCESS'
const actionTypeRetrieveLoginSuccess = 'RETRIEVE_LOGIN_SUCCESS'
const initialState = {
  classes: null,
  students: null,
  isCanAccess: false
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
      case actionTypeRetrieveClassessSuccess:
          return executeRetrieveClassesSuccess(state, action);
      case actionTypeRetrieveStudentsSuccess:
        return executeRetrieveStudentsSuccess(state, action);
      case actionTypeRetrieveLoginSuccess:
        return executeRetrieveLoginSuccess(state, action);
      default:
          return state;
  }
}
const executeRetrieveClassesSuccess = (state, action) => {
  return {
      ...state,
      classes: action.data
  }
}
const executeRetrieveStudentsSuccess = (state, action) => {
  return {
      ...state,
      students: action.data
  }
}
const executeRetrieveLoginSuccess = (state, action) => {
  return {
      ...state,
      isCanAccess: action.data
  }
}
const store = createStore(reducer, applyMiddleware(thunk));
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const {request} = params;
 ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
        <AirTableStudent/> 
    </React.StrictMode>
  </Provider>
, document.getElementById('root'));
