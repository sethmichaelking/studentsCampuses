import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCampuses, fetchStudents } from '../store'

class Campuses extends Component {

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
                        <li className="nav-item active" style={{marginRight: '20px' }}>
                            <Link to='/students'>
                            <h6 className="nav-link" href="#">Students ({students.length}) <span className="sr-only">(current)</span></h6>
                            </Link>
                        </li>
                        <li className="nav-item" style={{ border: '2px solid red' }}>
                            <Link to='/campuses'>
                            <h6 className="nav-link">Campuses ({campuses.length})</h6>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div>
                <div>
                    Here are the campuses and their amount of enrollments
                        {campuses.map(campus => {
                            return (
                            <div key={campus.id}>
                                <h5> {campus.name} has {campus.students.length} amount of students </h5>
                                    <ul>
                                        <li>
                                            Address: {campus.address}
                                        </li>
                                        <li>
                                            School description: {campus.description}
                                        </li>
                                    </ul>
                            </div>
                            )
                        })}
                </div>
            </div>
      </div>
    )
  }
}

const mapState = (state) => {
    return {
        students: state.students,
        campuses: state.campuses 
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
export default connect(mapState, mapDispatch)(Campuses)