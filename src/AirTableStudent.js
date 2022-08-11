import axios from "axios";
import {useEffect, useState} from "react";
import { connect , useDispatch , useSelector } from 'react-redux'
const AirTableStudent = (props) => {
    const [toBeDisplayed, setToBeDisplayed] = useState([]);
    const [studentName, setStudentName] = useState();
    const dispatch = useDispatch()
    const API_KEY = 'keyGgzUy1rgdYAjpM';
    const actionTypeRetrieveClassessSuccess = 'RETRIEVE_CLASSES_SUCCESS'
    const actionTypeRetrieveStudentsSuccess = 'RETRIEVE_STUDENTS_SUCCESS'
    const actionTypeRetrieveLoginSuccess = 'RETRIEVE_LOGIN_SUCCESS'
    const classes = useSelector(store => store.classes)
    const students = useSelector(store => store.students)
    const isCanAccess = useSelector(store => store.isCanAccess)
    const retrieveClassesSuccess = (data) => {
        if(data) {
            return {
                type: actionTypeRetrieveClassessSuccess,
                data: data.records
            }
        }
    }
    const retrieveStudentsSuccess = (data) => {
        if(data) {
            return {
                type: actionTypeRetrieveStudentsSuccess,
                data: data.records
            }
        }
    }
    const retrieveLoginSuccess = (data) => {
        if(data) {
            const {records} = data;
            if(records.length > 0){
                return {
                    type: actionTypeRetrieveLoginSuccess,
                    data: true
                }
            } else {
                return {
                    type: actionTypeRetrieveLoginSuccess,
                    data: false
                }
            }
        }
    }
  function retrieveClasses () {
    axios.get('https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Classes?view=Grid%20view', {
            headers: {
            Authorization: 'Bearer '.concat(API_KEY)
        }
    })
    .then(response => {
        dispatch(retrieveClassesSuccess(response.data));
    })
  }
  function retrieveStudents () {
    axios.get('https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Students?view=Grid%20view', {
            headers: {
            Authorization: 'Bearer '.concat(API_KEY)
        }
    })
    .then(response => {
        dispatch(retrieveStudentsSuccess(response.data));
    })
  }
  function retrieveStudent (name) {
    axios.get('https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Students?filterByFormula=(%7BName%7D+%3D+%22'.concat(name).concat("%22)"), {
            headers: {
            Authorization: 'Bearer '.concat(API_KEY)
        }
    })
    .then(response => {
        dispatch(retrieveLoginSuccess(response.data));
    })
  }
  useEffect(() => {
    if(isCanAccess) {
        retrieveClasses();
        retrieveStudents();
    }
  }, [isCanAccess])
  function filterNow() {
    if(studentName) {
        retrieveStudent(studentName);
    }
  }
  useEffect(() => {
    if(students && classes) {
        const student = students.find(f => f.fields.Name === studentName);
        const {id} = student;
        const filteredByTheStudentId = classes.filter(f=>f.fields.Students.includes(id));
        setToBeDisplayed(filteredByTheStudentId)
    }
  }, [classes, students])
  return <div className="App">
    <h1>AirTable API example</h1>
    <div>
        {   isCanAccess ?
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {toBeDisplayed.map(a => 
            <div style={{borderStyle: 'ridge' }}>
                <h4>Name</h4>
                <span>{a.fields.Name}</span>
                <h4>Students</h4>
                <span>
                {a.fields.Students.map(e=> {
                    const student = students.find(d=>d.id === e);
                    if(student) {
                        return students.find(d=>d.id === e).fields.Name.concat(", ");
                    }
                }
                )}
                </span>
            </div>
            )}
        </div> 
        :
        <div style={{display: 'flex', flexDirection: 'column'}}>
        <button>Log Out</button>
        <input type="text" onChange={(e) => setStudentName(e.target.value)}></input>
        <button onClick={() => filterNow()}>Login</button>
        </div>
        }
    </div>
  </div>
};
const mapStateToProps = (state) => {     
    return {  
       data: state.data     
    } 
}

export default connect(mapStateToProps)(AirTableStudent);
