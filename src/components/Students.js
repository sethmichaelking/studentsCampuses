import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCampuses, fetchStudents } from '../store'
import TheModal from './TheModal'
import { removetStudent } from '../store'
import styled from 'styled-components';
import { Table } from 'react-bootstrap'
import Filters from './Filters'
import DeleteStudentModal from './deleteStudentModal'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import {
    BiTrash
} from 'react-icons/bi'
import {
    BsClipboardData 
  } from 'react-icons/bs'
import StudentSearch from './StudentSearch'



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

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;


class Students extends Component {
    constructor(){
        super()
        this.state = {
            show: false,
            studentLength: 0
        }
        this.save = this.save.bind(this)
        this.handleClose = this.handleClose.bind(this),
        this.show = this.show.bind(this)
        this.save = this.save.bind(this)
        this.showEmpty = this.showEmpty.bind(this)
        this.displayStudents = this.displayStudents.bind(this)
        this.updateStudentLength = this.updateStudentLength.bind(this)
    }
    updateStudentLength(val){
        if(this.state.studentLength !== val){
            this.setState({ studentLength: val })
        }
    }
    displayStudents(students, search){
        if (students.length > 0 && search.length > 0){
            const foundStudent = students.filter(student => student.firstName.includes(search))
            const school = this.props.campuses.find(campus => campus.id === foundStudent.campusId)
            if (foundStudent.length > 0){
            console.log('students and search length:', foundStudent.length)
            this.updateStudentLength(foundStudent.length)
            return (
                    foundStudent.map(student => {
                        const school = this.props.campuses.find(campus => campus.id === foundStudent.campusId)
                        return (
                            <tr key={student.id}>
                                <td> <Link to={`/students/${student.id}`}> {student.firstName} </Link> </td>
                                <td> 
                                    <>
                                        <DeleteStudentModal theStudent={student.id}/>
                                    </>
                                </td>
                                <td>{school ?  <Link to={`/campuses/${school.id}`}> {`${school.name}`} </Link> : 'Not enrolled'}</td>
                                <td> {student.gpa} </td>
                            </tr>
                        )
                    })
            )
          } 
          console.log('nobody', 0)
          this.updateStudentLength(0)
          return (
            <>
            <tr style={{borderBottom: 'thin solid #dadce5'}}>
                    <td colSpan={6} style={{ borderBottom: 'thin solid #dadce5' }}>
                      <div >
                          <div style= {{ height: '200px', width: '87vw'}} > 
                                  <div style={{ textAlign: 'center', justifyContent: 'center', marginTop: '150px' }}>
                                      <h3>
                                        <BsClipboardData /> No student found. 
                                      </h3>
                                      <h5 style={{ marginLeft: '20px', marginTop: '20px' }}> 
                                      <Button varient="secondary" onClick={()=> window.location.reload()}>Reset Filters</Button>
                                      </h5>
                                  </div>
                            </div>
                         </div>
                      </td>
                  </tr>
            </>
          )
        } 
        else if (students.length > 0){
            console.log('students length:', students.length)
            this.updateStudentLength(students.length)
               return (
                students.map(student => {
                    const school = this.props.campuses.find(campus => campus.id === student.campusId)
                    return (
                        <tr key={student.id}>
                            <td> <Link to={`/students/${student.id}`}> {student.firstName} </Link> </td>
                            <td> 
                                <>
                                    <DeleteStudentModal theStudent={student.id}/>
                                </>
                            </td>
                            <td>{school ?  <Link to={`/campuses/${school.id}`}> {`${school.name}`} </Link> : 'Not enrolled'}</td>
                            <td> {student.gpa} </td>
                        </tr>
                    )
                })
               )
        } 
        else if (students.length === 0){
            console.log('no students', students.length)
            this.updateStudentLength(students.length)
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
                                      <h5 style={{ marginLeft: '-380px', marginTop: '20px' }}> 
                                            <TheModal style={{marginLeft: '200px'}}/> 
                                      </h5>
                                  </div>
                            </div>
                         </div>
                      </td>
                  </tr>
            </>
          )
        }
    }
    handleClose () {
        this.save()
    }
    show () {
     this.setState({ show: true })
    }
    save(id){
         this.props.deleteStudent(id)
    }
    showEmpty(students){
          if (students.length === 0){
            console.log('zero length:', students.length)
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
                                      <h5 style={{ marginLeft: '-380px', marginTop: '20px' }}> 
                                            <TheModal style={{marginLeft: '200px'}}/> 
                                      </h5>
                                  </div>
                            </div>
                         </div>
                      </td>
                  </tr>
            </>
          )
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
    const { students, search } = this.props
    const { studentLength } = this.state
    console.log('localstate:', studentLength)
    const { displayStudents } = this
    return (
      <div>
        <div>
            <div> 
                <HeadWrapper>
                    <div style={{width: '90vw'}}>
                        <div style={{
                            display: 'inline-block',
                            width: '92vw'
                            }}>
                            <div style={{
                                display: 'inline-block',
                            }}> 
                                <h2 style={{marginLeft: '1.5em', marginBottom: '15px'}}> Students </h2> 
                            </div>
                            <div style={{
                                display: 'inline-block',
                                position: 'relative',
                                float: 'right'
                            }}> 
                            <TheModal />
                            </div>
                        </div>
                    </div>
                </HeadWrapper>
                <div style={{ borderTop:  '1px solid #dadce5', marginTop: '-20px', height: '100vh', backgroundColor: '#f4f4f7'}}>
                    <div>
                        <GridWrapper>
                        <StudentSearch />
                        <div style={{width: '90vw'}}>
                            <div style={{
                                height: '45px',
                                border: '1px solid #dadce5',
                                backgroundColor: 'white',
                                marginBottom: '-1px'
                            }}>
                                <div>
                                    <div style={{display: 'inline-block'}}>
                                        <p style={{ textIndent: '10px', fontSize: '18px', marginTop: '7px' }}> Students ({studentLength}) </p>                           
                                    </div>
                                </div>
                            </div>
                            <Table style={{ 
                                backgroundColor: 'white', 
                                borderLeft: 'thin solid #dadce5',
                                borderRight: 'thin solid #dadce5', borderTop: 'thin solid #dadce5', borderBottom: 'thin solid #dadce5 !important'}} 
                                hover>
                                <thead>
                                    <tr style={{ borderBottom: 'thin solid #dadce5', backgroundColor: '#f4f4f7', color: '#1a1c25'}}>
                                    <th>FirstName</th>
                                    <th>Actions</th>
                                    <th>School</th>
                                    <th>GPA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    displayStudents(students, search)
                                    //if there are students 
                                        //if the search length is 0
                                            //show the students
                                        //if there is search length is
                                            //find the student show the student
                                                //if there is a student
                                                    //show student
                                                //no student
                                                    //sow emtpy state
                                    //if there are no students
                                        //show empty state
                                } 
                                </tbody>
                            </Table> 
                            </div>
                        </GridWrapper>
                      </div>
                    </div>
                </div>
            </div>
      </div>
    )
  }
}


const mapState = (state) => {
    return {
        students: state.students || {},
        campuses: state.campuses || {},
        search: state.search || {}
    }
}
const mapDispatch = (dispatch) => {
    return {
        load: () => {
            dispatch(fetchCampuses())
            dispatch(fetchStudents())
        },
        deleteStudent: (id) => dispatch(removetStudent(id))
    }
}
export default connect(mapState, mapDispatch)(Students, TheModal, DeleteStudentModal)