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
            show: false
        }
        this.save = this.save.bind(this)
        this.handleClose = this.handleClose.bind(this),
        this.show = this.show.bind(this)
        this.save = this.save.bind(this)
        this.showEmpty = this.showEmpty.bind(this)
        this.displayStudents = this.displayStudents.bind(this)
    }
    displayStudents(students, search){
        console.log("search", search, "sarch len", search.length, "sarch type", typeof search, "sarch length greataer than zero", search.length > 0);
        if (students.length > 0 && search.length > 0){
            const foundStudent = students.filter(student => student.firstName.includes(search))
            console.log("studnets found",  foundStudent)
            const school = this.props.campuses.find(campus => campus.id === foundStudent.campusId)
            if (foundStudent.length > 0){
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
    const { students, campuses, search } = this.props
    const { save, handleClose, showEmpty, displayStudents } = this
    console.log('search', search)
    return (
      <div>
        <div>
            <div> 
                <HeadWrapper>
                    <div>
                        <div style={{
                            display: 'inline-block',
                            }}>
                            <div style={{
                                display: 'inline-block',
                            }}> 
                            <h2 style={{marginLeft: '1.5em', marginBottom: '15px'}}> Students </h2>                            </div>
                            <div style={{
                                display: 'inline-block',
                                position: 'relative',
                                left: '600px',
                            }}> 
                                <TheModal /> 
                            </div>
                        </div>
                    </div>
                </HeadWrapper>
                <div style={{ borderTop:  '1px solid #dadce5', marginTop: '-20px', height: '648px', backgroundColor: '#f4f4f7'}}>
                    <div>
                    <GridWrapper>
                             <div>
                                <StudentSearch />
                            </div>
                            <div style={{
                                height: '45px',
                                border: '1px solid #dadce5',
                                backgroundColor: 'white',
                                marginBottom: '-10px'
                            }}>
                                <div>
                                    <div style={{display: 'inline-block'}}>
                                        <p style={{ textIndent: '10px', fontSize: '18px', marginTop: '7px' }}> Students ({students.length}) </p>                           
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