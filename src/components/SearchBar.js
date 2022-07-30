import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStudents } from '../store' 

class SearchBar extends Component {
    constructor(){
        super()
        this.state = {
            searchTerm: ''
        }
    }
    componentDidMount(){
        this.props.load()
    }
  render() {
    
    return (
      <div>
       
      </div>
    )
  }
}

const mapState = (state) =>{
    return {
        students: state.students,
        campuses: state.campuses
    }
}

const mapDispatch = (dispatch) => {
    return {
        load: () => {
            dispatch(fetchStudents())
        }
    }
}


export default connect(mapState, mapDispatch)(SearchBar)
