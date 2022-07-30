import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCampuses, fetchStudents, updateFirstName, updateLastName, updateTheEmail } from '../store'
import EasyEdit from 'react-easy-edit';
import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import {toastr} from 'react-redux-toastr'
import Profile from './Profile';
const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;


  
class Student extends Component {
  render() {
    const { student, campus } = this.props
    return (
      <div>
        <GridWrapper>
             <Profile student={student} id={this.props.id} campus={campus} firstName={this.props.firstName} lastName= {this.props.lastName} />
        </GridWrapper>
      </div>
    )
  }
}
const mapState = (state, otherProps) => {
    const id = otherProps.match.params.id * 1
    const student = state.students.find((student) => student.id === id) || {}
    const campus = state.campuses.find(campus => campus.id === student.campusId) || {}
    return {
        students: state.students,
        campuses: state.campuses,
        student,
        campus,
        id
    }
}

const mapDispatch = (dispatch, otherProps) => {
    const id = otherProps.match.params.id * 1
    return {
        load: () => {
            dispatch(fetchStudents()),
            dispatch(fetchCampuses())
        },
        firstName: (value, id) => dispatch(updateFirstName({ value: value, id: id })),
        lastName: (value, id) => dispatch(updateLastName({ value: value, id: id })),
        saveTheEmail: (value, id) => dispatch(updateTheEmail({ value: value, id: id }))
    }
}
export default connect(mapState, mapDispatch)(Student)