import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCampuses, fetchStudents } from '../store'

class Students extends Component {

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
                        <li className="nav-item active" style={{marginRight: '20px', border: '2px solid red'  }}>
                            <Link to='/campuses'>
                            <h6 className="nav-link" href="#">Students({students.length})<span className="sr-only">(current)</span></h6>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/campuses'>
                            <h6 className="nav-link" href="#">Campuses ({campuses.length})</h6>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        <div style={{marginLeft: '40px'}}>
            <div>
                Here are the list of students and where they are going to school.
                <ul>
                 {students ? students.map(student => {
                    const school = campuses.find(campus => campus.id === student.campusId)
                    return (
                        <li key={student.id}>
                            <Link to={`/students/${student.id}`}> {student.firstName} </Link> goes to {school ? school.name : 'loading'}
                        </li>
                    )
                }) : 'there are no students'} 
                </ul>
            </div>
        </div>
            <div>
                <div className="container">
                    <div className="row">
                        {students.map(student => {
                            const campus = campuses.find((campus) => campus.id === student.campusId)
                            return (
                                <div key={student.id} className="col card" style={{marginRight: '10px', marginTop: '10px'}}>
                                    <ul>
                                        <li> First Name: {student.firstName} </li>  
                                        <li> Last Name: {student.lastName} </li>
                                        <li> Email: {student.email} </li>
                                        <li> Image Url: {student.imageUrl} </li> 
                                        <li> GPA: {student.gpa} </li>
                                        <li> Campus: {campus ? campus.name : 'loading'} </li>
                                    </ul>
                                </div>
                            )
                        })}
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
        campuses: state.campuses || {}
    }
}
const mapDispatch = (dispatch) => {
    return {
        load: () => {
            dispatch(fetchCampuses())
            dispatch(fetchStudents())
        }
    }
}
export default connect(mapState, mapDispatch)(Students)