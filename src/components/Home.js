import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCampuses, fetchStudents, setTheSelect} from '../store'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import Filters from './Filters';

import {
  BsClipboardData 
} from 'react-icons/bs'

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;

const HeadWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 3em;
  margin-right: 6em;
  border-bottom: 1px solid #dadce5;
  width: 100vw;
  margin-bottom: 20px

`;

const BodyWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 3em;
  margin-right: 6em;
  width: 100vw;
  margin-bottom: 20px
`;

class Home extends Component {
  constructor(){
    super()
    this.state = {

    }
    this.average = this.average.bind(this)
    this.averageOneCampusGPA = this.averageOneCampusGPA.bind(this)
    this.getAllStudents = this.getAllStudents.bind(this)
    this.getOneCampusStudents = this.getOneCampusStudents.bind(this)
  }

  getAllStudents(students, select){
    try {
      return (
        students.map(student => (
          <>
            <tr key={student.id}>
                <td>{student.firstName} </td>
                <td>{student.lastName} </td>
                <td>{student.email} </td>
                <td>{student.gpa} </td>
                </tr>
            </>
        ))
      )
    }
    catch(err){
      console.log(err)
    }
  }
  getOneCampusStudents(students, select){
    try {
      const filteredStudents = students.filter(student => student.campusId === select.id)
      if (filteredStudents.length > 0){
        return (
          filteredStudents.map(student => (
       <>
        <tr key={student.id}>
            <td>{student.firstName} </td>
            <td>{student.lastName} </td>
            <td>{student.email} </td>
            <td>{student.gpa} </td>
            </tr>
        </>
          ))
        )
      }
      return (
        <>
        <tr style={{borderBottom: 'thin solid #dadce5'}}>
                <td colSpan={6} style={{ borderBottom: 'thin solid #dadce5' }}>
                  <div >
                      <div style= {{ height: '200px', width: '87vw'}} > 
                              <div style={{ textAlign: 'center', justifyContent: 'center', marginTop: '150px' }}>
                                  <h3>
                                    <BsClipboardData /> No students enrolled in <Link to={select ? `/campuses/${select.id}` : '/campuses'}> {select.name} </Link>
                                  </h3>
                                  <h5> 
                                    <Link to='/students'>
                                      <Button variant="secondary">Create first student</Button>
                                    </Link>
                                  </h5>
                              </div>
                        </div>
                     </div>
                  </td>
              </tr>
        </>
      )
    }
    catch(err){
      console.log(err)
    }
  }
  average(students) {
    let total = 0
    for (let i = 0; i < students.length; i++){
        let student = students[i]
        total += student.gpa * 1
    }
    let newTotal = total/students.length
    return newTotal.toString().slice(0, 3)
  }
  averageOneCampusGPA(select, students){
    try {
      const res = students.filter(student => student.campusId == select.id)
      if (res.length > 0){
        const gpaAverage = this.average(res)
        return gpaAverage.toString().substring(0, 4)
      } 
      if (res.length === 0){
       return 'No students are enrolled'
      }
    }
    catch(err){
      console.log()
    }
  }
  componentDidMount(){
    try {
      this.props.load()
    }
    catch(err){
      console.log(err)
    }
  }
  render() {
    const { students, campuses, select } = this.props
    return (
      <div>
       <HeadWrapper >
          <h2 style={{marginLeft: '1.5em', marginBottom: '15px'}}> Home </h2>
        </HeadWrapper>  
        <div style={{ borderTop:  '1px solid #dadce5', marginTop: '-20px', height: '648px', backgroundColor: '#f4f4f7'}} >
         <div>
          <GridWrapper>
              <Filters/>  
                  <div style={{
                      height: '45px',
                      border: '1px solid #dadce5',
                      backgroundColor: 'white',
                      marginBottom: '-10px'
                    }}>
                    <div>
                        <div style={{display: 'inline-block'}}>
                            <p style={{ textIndent: '10px', fontSize: '18px', marginTop: '7px' }}> Students ({students && select.id ? students.filter(student => student.campusId === select.id).length : students.length}) </p>                           
                        </div>
                        <div style={{display: 'inline-block', float:'right', paddingRight: '10px'}}>
                            <p style={{ textIndent: '10px', fontSize: '18px', marginTop: '7px' }}> 
                              {/* {students && select.id ? this.average(students.filter(student => student.campusId === select.id)) : select.length > 0 ? this.average(students): students && !select.id ? this.average(students) : 'we have students'} */}
                              GPA: {students && select ? select.id ? this.averageOneCampusGPA(select, students) : this.average(students) : console.log('there is not select.id')}
                             </p>                           
                        </div>
                     </div>
                  </div>
                  <Table  
                  style={{ 
                    backgroundColor: 'white', 
                    borderLeft: 'thin solid #dadce5',
                    borderRight: 'thin solid #dadce5', borderTop: 'thin solid #dadce5', borderBottom: 'thin solid #dadce5 !important'}} 
                    hover>
                  <thead>
                    <tr style={{ borderBottom: 'thin solid #dadce5', backgroundColor: '#f4f4f7', color: '#1a1c25'}}>
                      <th style={{fontSize: '15px'}}>First Name</th>
                      <th style={{fontSize: '15px'}}>Last Name</th>
                      <th style={{fontSize: '15px'}}>Email</th>
                      <th style={{fontSize: '15px'}}>GPA</th>
                    </tr>
                  </thead>
                  <tbody>
                  {students && select ? 
                  select.id ? 
                  <>
                      {/* get one campusStudents */}
                      {this.getOneCampusStudents(students, select)}
                  </>
                  : 
                  <>
                      {/* get all students */}
                        {this.getAllStudents(students, select)}
                  </>
                  : 
                    console.log('there is no select')}
                  </tbody>
                </Table>
            </GridWrapper>
             </div>
            </div> 
        </div>
    )
  }
}

const mapState = (state, otherProps) => {
  console.log(otherProps)
  return {
      students: state.students.sort((a,b) => b.gpa - a.gpa),
      campuses: state.campuses.sort((a,b) => a.id - b.id),
      select: state.selected,
  }
}
const mapDispatch = (dispatch) => {
  return {
      load: () => {
          dispatch(fetchCampuses())
          dispatch(setTheSelect())
      }
   }
}

export default connect(mapState, mapDispatch)(Home)










{/* {students && select.id ? students
                  .filter(student => student.campusId === select.id).map(student => {
                    const school = campuses.find(campus => campus.id === student.campusId)
                      return (
                        <tr key={student.id}>
                          <td key={student.id}>
                            <Link to={`/students/${student.id}`}> {student.firstName}  </Link>
                          </td>
                          <td>
                            {student.lastName}
                          </td>
                          <td>{school ?  <Link to={`/campuses/${school.id}`}> {`${school.name}`} </Link> : 'Not enrolled'}</td>
                          <td>
                            {student.gpa}
                          </td>
                        </tr>
                      )
                    }) : students && students.length > 0 ? students.map(student => {
                      const school = campuses.find(campus => campus.id === student.campusId)
                        return (
                          <tr key={student.id}>
                            <td key={student.id}>
                              <Link to={`/students/${student.id}`}> {student.firstName}  </Link>
                            </td>
                            <td>
                              {student.lastName}
                            </td>
                            <td>{school ?  <Link to={`/campuses/${school.id}`}> {`${school.name}`} </Link> : 'Not enrolled'}</td>
                            <td>
                              {student.gpa}
                            </td>
                          </tr>
                        )
                      }) : 
                      students.map(student => {
                        const school = campuses.find(campus => campus.id === student.campusId)
                          return (
                            <tr key={student.id}>
                              {school.id}
                            </tr>
                          )
                        })
                  } */}



  // componentDidUpdate(prevProps){
  //   try{
  //     if (prevProps.id === undefined){
  //       console.log('dispatch set')
  //     }
  //   }
  //   catch(err){
  //     console.log(err)
  //   }
  // }