import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCampuses, fetchStudents } from '../store'
import TheModal from './TheModal'
import { removetStudent } from '../store'
import styled from 'styled-components';
import { Table } from 'react-bootstrap'
import Filters from './Filters'

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

        }
        this.save = this.save.bind(this)
    }
    save(id){
         this.props.deleteStudent(id)
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
    const { students, campuses } = this.props
    const { save } = this
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
                                left: '620px',
                            }}> 
                                <TheModal /> 
                            </div>
                        </div>
                    </div>
                </HeadWrapper>
                <GridWrapper>
                    <div>
                        <div>
                        {/* <Filters /> */}
                        </div>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                <th>FirstName</th>
                                <th>Actions</th>
                                <th>School</th>
                                <th>GPA</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {students ? students.map(student => {
                                    const school = campuses.find(campus => campus.id === student.campusId)
                                    return (
                                        <tr key={student.id}>
                                            <td> <Link to={`/students/${student.id}`}> {student.firstName} </Link> </td>
                                            <td> <button onClick={() => save(student.id)}> X </button> </td>
                                            <td>{school ?  <Link to={`/campuses/${school.id}`}> {`${school.name}`} </Link> : 'Not enrolled'}</td>
                                            <td> {student.gpa} </td>
                                        </tr>
                                    )
                                }) : 'there are no students'} 
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


const mapState = (state) => {
    return {
        students: state.students || {},
        campuses: state.campuses || {}
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
export default connect(mapState, mapDispatch)(Students, TheModal)