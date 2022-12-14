import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCampuses, fetchStudents, setTheSelect} from '../store'
import { Button } from 'react-bootstrap'
import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import Filters from './Filters';
import LoadingIcons from 'react-loading-icons'
import { Bars } from 'react-loading-icons'

import {
  BsClipboardData 
} from 'react-icons/bs'
import axios from 'axios'


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
      loading: false,
      loggedInUser: ''
    }
    this.average = this.average.bind(this)
    this.averageOneCampusGPA = this.averageOneCampusGPA.bind(this)
    this.getAllStudents = this.getAllStudents.bind(this)
    this.getOneCampusStudents = this.getOneCampusStudents.bind(this)
  }

  getAllStudents(students, select){
    try {
      if (students.length > 0){
      return (
        students.map(student => (
          <>
            <tr key={student.id}>
                <td><Link to={`/students/${student.id}`}> {student.firstName}  </Link> </td>
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
                                  <BsClipboardData /> No students enrolled 
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
  getOneCampusStudents(students, select){
    try {
      const filteredStudents = students.filter(student => student.campusId === select.id)
      if (filteredStudents.length > 0){
        return (
          filteredStudents.map(student => (
       <>
        <tr key={student.id}>
            <td><Link to={`/students/${student.id}`}> {student.firstName} </Link> </td>
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
    if(students.length > 0){
    let total = 0
    for (let i = 0; i < students.length; i++){
        let student = students[i]
        total += student.gpa * 1
    }
    let newTotal = total/students.length
    return newTotal.toString().slice(0, 3)
  }
  return 0
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
      this.setState({ isLoggedIn: this.props.loggedInUser })
      this.setState({ 
        loading: true
      })
      setTimeout(async ()=> {
          await this.setState({ 
            loading: false
          })
      }, 1600)
    }
    catch(err){
      console.log(err)
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.loggedInUser.length === 0 && this.props.loggedInUser.length === 1){
      this.setState({ loggedInUser: this.props.loggedInUser })
    }
  }
  render() {
    const { students, campuses, select, loggedInUser } = this.props
    const { loading } = this.state
    console.log('loading', loading)
    return (
      <div>
       <HeadWrapper >
          <h2 style={{marginLeft: '1.5em', marginBottom: '15px'}}> Home </h2>
        </HeadWrapper>  
        <div style={{ borderTop:  '1px solid #dadce5', marginTop: '-20px', height: '100vh', backgroundColor: '#f4f4f7'}} >
         <div>
          <GridWrapper>
              <Filters/>  
              <div style={{width: '90vw'}}>
                    <div style={{
                                width: '90vw',
                                display: 'inline-block',
                                height: '45px',
                                border: '1px solid #dadce5',
                                backgroundColor: 'white',
                                marginBottom: '-10px !imoprtant'
                        }}>
                      <div>
                          <div style={{display: 'inline-block'}}>
                              <p style={{ textIndent: '10px', fontSize: '18px', marginTop: '7px' }}> Students ({students && select.id ? students.filter(student => student.campusId === select.id).length : students.length}) </p>                           
                          </div>
                          <div style={{display: 'inline-block', float:'right', paddingRight: '10px'}}>
                              <p style={{ textIndent: '10px', fontSize: '18px', marginTop: '7px' }}> 
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
                      { loading ? 
                <tr style={{borderBottom: 'thin solid #dadce5'}}>
                <td colSpan={6} style={{ borderBottom: 'thin solid #dadce5' }}>
                  <div >
                      <div style= {{ height: '200px', width: '87vw'}} > 
                              <div style={{ textAlign: 'center', justifyContent: 'center', marginTop: '150px' }}>
                                  <h3>
                                  <Bars  stroke="#ff0000" fill='#F88379' strokeOpacity={.125}/>
                                  </h3>
                              </div>
                        </div>
                     </div>
                  </td>
              </tr> : this.getOneCampusStudents(students, select)}
                  </>
                  : 
                  <>
                { loading ?  <tr style={{borderBottom: 'thin solid #dadce5'}}>
                <td colSpan={6} style={{ borderBottom: 'thin solid #dadce5' }}>
                  <div >
                      <div style= {{ height: '200px', width: '87vw'}} > 
                              <div style={{ textAlign: 'center', justifyContent: 'center', marginTop: '150px' }}>
                                  <h3>
                                    <Bars stroke="#ff0000" fill='#F88379' strokeOpacity={.125}/>
                                  </h3>
                              </div>
                        </div>
                     </div>
                  </td>
              </tr> : this.getAllStudents(students, select)}
                  </>
                  : 
                    console.log('there is no select')}
                  </tbody>
                </Table>
                </div>
            </GridWrapper>
             </div>
            </div> 
        </div>
    )
  }
}

const mapState = (state, otherProps) => {
  return {
      students: state.students.sort((a,b) => b.gpa - a.gpa),
      campuses: state.campuses.sort((a,b) => a.id - b.id),
      select: state.selected,
      loggedInUser: state.loggedInUser
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
