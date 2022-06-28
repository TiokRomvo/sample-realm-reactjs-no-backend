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
  function imageConvertor(files, setter,idx) {
    var file = files[0]
    if(file.size <= 500) {
      var reader = new FileReader();
      reader.onloadend = function () {
        if(idx === 'undefined') {
          setter(reader.result);
        } else {
          setter(reader.result, idx);
        }
      }
      reader.readAsDataURL(file);
    } else {
      alert("Only smaller than 500kb")
    }
}

 function setCompanyImage(data,idx) {
  console.log(idx)
  const theData = theWorkExperiences[idx];
  theData.companyLogo = data;
  theWorkExperiences[idx] = theData;
  setTheWorkExperiences(Array.from(theWorkExperiences));
 }
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
      <p>Name</p><input type="text" onChange={(e) => setTheName(e.target.value)} defaultValue={theName}></input>
      <p>Profile Image</p><img style={{width: 100, height: 100}} src={theProfilePicture}/>
      <p>Profile Picture</p><input type="file" onChange={(e) => {
        imageConvertor(e.target.files, setTheProfilePicture)
      }}></input>
      <p>Age</p><input type="text" onChange={(e) => setTheAge(e.target.value)} defaultValue={theAge}></input>
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
              <p>Start date</p><input type="datetime-local" onChange={(e) => 
                { 
                  const theData = theWorkExperiences[idx];
                  theData.startDate = e.target.value;
                  theWorkExperiences[idx] = theData;
                  setTheWorkExperiences(Array.from(theWorkExperiences));
                }
              } defaultValue={c.startDate}></input>
             <p>End date</p><input type="datetime-local" onChange={(e) => 
                { 
                  const theData = theWorkExperiences[idx];
                  theData.endDate = e.target.value;
                  theWorkExperiences[idx] = theData;
                  setTheWorkExperiences(Array.from(theWorkExperiences));
                }
              } defaultValue={c.endDate}></input>
               <p>Job title</p><input type="text" onChange={(e) => 
                { 
                  const theData = theWorkExperiences[idx];
                  theData.jobTitle = e.target.value;
                  theWorkExperiences[idx] = theData;
                  setTheWorkExperiences(Array.from(theWorkExperiences));
                }
              } defaultValue={c.jobTitle}></input>
               <p>Company</p><input type="text" onChange={(e) => 
                { 
                  const theData = theWorkExperiences[idx];
                  theData.company = e.target.value;
                  theWorkExperiences[idx] = theData;
                  setTheWorkExperiences(Array.from(theWorkExperiences));
                }
              } defaultValue={c.company}></input>
               <p>Company logo</p><img style={{width: 100, height: 100}} src={c.companyLogo}/>
                <input type="file" onChange={(e) => {
                  imageConvertor(e.target.files, setCompanyImage, idx)
                }}></input>
               <p>Job description</p><input type="text" onChange={(e) => 
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
