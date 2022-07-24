import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCampuses, fetchStudents } from '../store'

class Student extends Component {

    componentDidMount(){
        try {
            this.props.load()
        }
        catch(err){
            console.log(err)
        }
    }
  render() {
    const { students, campuses, student, campus } = this.props
    console.log(campus)
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/students'>
                <h6 className="navbar-brand" style={{marginRight: '20px'}}>Acme Schools</h6>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active" style={{marginRight: '20px', border: '2px solid red' }}>
                            <Link to='/students'>
                            <h6 className="nav-link" href="#">Students {'>'} ({student.firstName ? student.firstName : 'loading'}) <span className="sr-only">(current)</span></h6>
                            </Link>
                        </li>
                        <li className="nav-item" >
                            <Link to='campuses'>
                            <h6 className="nav-link" href="#">Campuses</h6>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div>
                <div>
                   <h5> {student.firstName} goes to <Link to={`/campuses/${campus.id}`}> {campus.name || 'loading'} </Link></h5>
                </div>
                <div>
                  <ul>
                    <li> Fullname: {student.firstName} {student.lastName} </li>
                    <li> Email: {student.email}</li>
                    <li> GPA {student.gpa} </li>
                  </ul>
                </div>
            </div>
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
        campus
    }
}

const mapDispatch = (dispatch) => {
    return {
        load: () => {
            dispatch(fetchStudents()),
            dispatch(fetchCampuses())
        }  
    }
}
export default connect(mapState, mapDispatch)(Student)