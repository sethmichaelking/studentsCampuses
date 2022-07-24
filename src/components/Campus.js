import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCampuses, fetchStudents } from '../store'
class Campus extends Component {

    componentDidMount() {
        try {
            this.props.load()
        }
        catch(err){
            console.log(err)
        }
    }
  render() {
    const { students, campuses, campus, campusStudents } = this.props
    const keys = Object.keys(campusStudents)
    const bird = []
    for (let key of keys){
        let newBird = campusStudents[key]
        bird.push(newBird)
    }
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
                        <li className="nav-item active" style={{marginRight: '20px' }}>
                            <Link to='/students'>
                            <h6 className="nav-link" href="#">Students  <span className="sr-only">(current)</span></h6>
                            </Link>
                        </li>
                        <li className="nav-item" style={{ border: '2px solid red' }}>
                            <Link to='/campuses'>
                            <h6 className="nav-link" href="#">Campuses ({campus.name})</h6>
                            </Link>
                        </li>
                    </ul>
                </div>
         </nav>
         <div>
            <ul>
                <li> Campus: {campus.name}</li> 
                <li> Address: {campus.address}</li>
            </ul>
         </div>
         <div>
                <h4>Students enrolled in {campus.name}. <br></br>
                There {campusStudents.length || 'loading'} students enrolled.</h4>
                <ul>
                  {bird.length > 0 ? bird.map(student => {
                    return (
                        <div key={student.id}>
                            {student.firstName ? student.firstName : 'loading'}
                        </div>
                    )
                  }) : ''}
                </ul>
         </div>
      </div>
    )
  }
}
const mapState = (state, otherProps) => {
    const id = otherProps.match.params.id * 1
    const campus = state.campuses.find(campus => campus.id === id) || {}
    const campusStudents = campus.students ? campus.students : {}
    return {
        students: state.students,
        campuses: state.campuses,
        campus,
        campusStudents
    }
}

const mapDispatch = (dispatch) => {
    return {
        load: () => {
            dispatch(fetchCampuses()),
            dispatch(fetchStudents())
        }
    }
}

export default connect(mapState, mapDispatch)(Campus)