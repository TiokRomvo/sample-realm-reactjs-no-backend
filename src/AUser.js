import {useEffect, useState} from "react";
import axios from "axios";

const AUser = () => {
  const userData = 'https://us-east-1.aws.data.mongodb-api.com/app/application-0-jzhmn/endpoint/getADocument?collectionName=aUser';
  const [theId, setTheId] = useState("62badcd5a2304ebd599bde9a");
  const usersAddLink = 'https://us-east-1.aws.data.mongodb-api.com/app/application-0-jzhmn/endpoint/updateADocument?collectionName=aUser&id='.concat(theId);
  const [theName, setTheName] = useState();
  const [theProfilePicture, setTheProfilePicture] = useState();
  const [theAge, setTheAge] = useState();
  const [theWorkExperiences, setTheWorkExperiences] = useState([
  {
    startDate: null,
    endDate: null,
    jobTitle: null,
    company: null,
    companyLogo: null,
    jobDescription: null
  }
  ]);
  const getRegisterUser = () => {
    axios.get(userData.concat("&id=").concat(theId)).then(res => {
      const {data} = res;
      const {theName, _id, theProfilePicture, theAge, theWorkExperiences} = data;
      setTheName(theName);
      setTheProfilePicture(theProfilePicture);
      setTheAge(theAge);
      setTheWorkExperiences(theWorkExperiences);
    })
  }
  useEffect(() => {
    getRegisterUser();
  }, [])
  const register = () => {
      const data = {
        "theName": theName,
        "theProfilePicture": theProfilePicture,
        "theAge": theAge,
        "theWorkExperiences": theWorkExperiences
      }
        axios.put(usersAddLink, data).then(res => {
          getRegisterUser();
      })
  }
  return <div className="App">
    <h1>Users</h1>
    <div style={{display: "grid"}}>
      <input type="text" onChange={(e) => setTheName(e.target.value)} defaultValue={theName}></input>
      <input type="file" onChange={(e) => theProfilePicture(e.target.value)} defaultValue={theProfilePicture}></input>
      <input type="text" onChange={(e) => setTheAge(e.target.value)} defaultValue={theAge}></input>
      <div>Work experiences</div><button onClick={() => {
        const theData = Array.from(theWorkExperiences);
        theData.push({
          startDate: null,
          endDate: null,
          jobTitle: null,
          company: null,
          companyLogo: null,
          jobDescription: null
        })
        setTheWorkExperiences(theData)
      }}>Add More</button>
      {theWorkExperiences.map ? theWorkExperiences.map((c,idx) => 
          <div key={idx}>
              <input type="datetime-local" onChange={(e) => 
                { 
                  const theData = theWorkExperiences[idx];
                  theData.startDate = e.target.value;
                  theWorkExperiences[idx] = theData;
                  setTheWorkExperiences(Array.from(theWorkExperiences));
                }
              } defaultValue={c.startDate}></input>
             <input type="datetime-local" onChange={(e) => 
                { 
                  const theData = theWorkExperiences[idx];
                  theData.endDate = e.target.value;
                  theWorkExperiences[idx] = theData;
                  setTheWorkExperiences(Array.from(theWorkExperiences));
                }
              } defaultValue={c.endDate}></input>
               <input type="text" onChange={(e) => 
                { 
                  const theData = theWorkExperiences[idx];
                  theData.jobTitle = e.target.value;
                  theWorkExperiences[idx] = theData;
                  setTheWorkExperiences(Array.from(theWorkExperiences));
                }
              } defaultValue={c.jobTitle}></input>
               <input type="text" onChange={(e) => 
                { 
                  const theData = theWorkExperiences[idx];
                  theData.company = e.target.value;
                  theWorkExperiences[idx] = theData;
                  setTheWorkExperiences(Array.from(theWorkExperiences));
                }
              } defaultValue={c.company}></input>
               <input type="file" onChange={(e) => 
                { 
                  const theData = theWorkExperiences[idx];
                  theData.companyLogo = e.target.value;
                  theWorkExperiences[idx] = theData;
                  setTheWorkExperiences(Array.from(theWorkExperiences));
                }
              }></input>
               <input type="text" onChange={(e) => 
                { 
                  const theData = theWorkExperiences[idx];
                  theData.jobDescription = e.target.value;
                  theWorkExperiences[idx] = theData;
                  setTheWorkExperiences(Array.from(theWorkExperiences));
                }
              } defaultValue={c.jobDescription}></input>
          </div>
        )
        :null
      }
      <div>

      </div>
      <button onClick={() => register()}>Update</button>
    </div>
  </div>
};
export default AUser;
