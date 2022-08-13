import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Component } from 'react'
import { fetchCampuses, fetchStudents } from '../store';
import { Link } from 'react-router-dom';
const Styles = styled.div`
  .navbar { 
    background-color: #222; 
}
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .nav-item {
    margin-right: 45px
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
    width: 30%
  }
`;


class NavigationBar extends Component {
  constructor(){
    super()
    this.state = {

    }
  }
  componentDidMount(){
    try{
        this.props.load()
    }
    catch(err){
        console.log(err)
    }
  }
  render() {
    return (
    <div>
    <Styles>
        <Navbar expand="lg">
          <Navbar.Brand> <Link to='/home'>  KampusTracker </Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Form className="form-center">
            <FormControl type="text" placeholder="Search" className="" />
          </Form>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item>
                <Link to='/home'>
                Home
                </Link>
            </Nav.Item> 
              <Nav.Item>
                <Link to='/students'>
                Students ({this.props.students.length})
                </Link>
            </Nav.Item>
              <Nav.Item>
                <Link to='/campuses'>
                Campuses ({this.props.campuses.length})
                </Link>
            </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles>
      </div>
    )
  }
}



const mapState = (state)=> {
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
export default connect(mapState, mapDispatch)(NavigationBar)