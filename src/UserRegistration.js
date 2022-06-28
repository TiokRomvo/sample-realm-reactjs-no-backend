import {useEffect, useState} from "react";
import axios from "axios";

const UserRegistration = () => {
  const registerUserList = 'https://us-east-1.aws.data.mongodb-api.com/app/application-0-jzhmn/endpoint/getDocuments?collectionName=userRegistration';
  const usersAddLink = 'https://us-east-1.aws.data.mongodb-api.com/app/application-0-jzhmn/endpoint/addADocument?collectionName=userRegistration';
  const [theName, setTheName] = useState();
  const [theEmail, setTheEmail] = useState();
  const [thePaymentMethod, setThePaymentMethod] = useState();
  const [theAge, setTheAge] = useState();
  const [theGender, setTheGender] = useState();
  const [theRace, setTheRace] = useState();
  const [theCountryOrigin, setTheCountryOrigin] = useState();
  const [theCountryResident, setTheCountryResident] = useState();
  const [theCIF, setTheCIF] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [theUserList, setTheUserList] = useState([]);
  const getRegisterUsers = () => {
    axios.get(registerUserList).then(res => {
      const {data} = res;
      setTheUserList(data);
    })
  }
  useEffect(() => {
    getRegisterUsers();
  }, [])
  const register = () => {
    if(isChecked) {
      const data = {
        "theName": theName,
        "theEmail": theEmail,
        "thePaymentMethod": thePaymentMethod,
        "theAge": theAge,
        "theGender": theGender,
        "theRace": theRace,
        "theCountryOrigin": theCountryOrigin,
        "theCountryResident": theCountryResident,
        "theCIF": theCIF
      }
        axios.post(usersAddLink, data).then(res => {
          getRegisterUsers();
      })
    }
  }
  return <div className="App">
    <h1>Users</h1>
    <div style={{display: "grid"}}>
      <input type="text" onChange={(e) => setTheName(e.target.value)} placeholder="theName"></input>
      <input type="text" onChange={(e) => setTheEmail(e.target.value)} placeholder="theEmail"></input>
      <input type="text" onChange={(e) => setThePaymentMethod(e.target.value)} placeholder="thePaymentMethod"></input>
      <input type="text" onChange={(e) => setTheAge(e.target.value)} placeholder="theAge"></input>
      <input type="text" onChange={(e) => setTheGender(e.target.value)} placeholder="theGender"></input>
      <input type="text" onChange={(e) => setTheRace(e.target.value)} placeholder="theRace"></input>
      <input type="text" onChange={(e) => setTheCountryOrigin(e.target.value)} placeholder="theCountryOrigin"></input>
      <input type="text" onChange={(e) => setTheCountryResident(e.target.value)} placeholder="theCountryResident"></input>
      CIF <input type="file" onChange={(e) => setTheCIF(e.target.value)} placeholder="theCIF"></input>
      <input type="checkbox" onChange={(e) => {setIsChecked(!isChecked)}}/> I confirm to allow the company to use my data for AI data training purposes of this project
      <button onClick={() => register()}>Register</button>
    </div>
    <div style={{display: 'block'}}>
      <h1>List</h1>
      
      <div>
      <table>
        <thead>
            <tr>
            <th>Name</th>
            <th>Payment Method</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Race</th>
            <th>Country Origin</th>
            <th>Country Resident</th>
            <th>CIF</th>
            </tr>
          </thead>
            <tbody>
        {theUserList.map(c => 
          <tr key={c._id}>
            <td>{c.theName}</td>
            <td>{c.theEmail}</td>
            <td>{c.thePaymentMethod}</td>
            <td>{c.theAge}</td>
            <td>{c.theGender}</td>
            <td>{c.theRace}</td>
            <td>{c.theCountryOrigin}</td>
            <td>{c.theCountryResident}</td>
          </tr>
        )
      }
      </tbody>
       </table>
          </div>
    </div>
  </div>
};
export default UserRegistration;
