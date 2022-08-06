import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCampuses, fetchStudents, updateAddress, updateThePhoto, updateCampusCity, updateName, updateDescription, updateTheName, removeStudentFromCampus } from '../store'
import EasyEdit from 'react-easy-edit';
import styled from 'styled-components';
import { Table, Button } from 'react-bootstrap';
import {
    BsClipboardData
  } from 'react-icons/bs'

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 8em;
  margin-right: 65em;
`;

class Campus extends Component {
    constructor(){
        super()
        this.state = {
            campusName: ''
        }
        this.save = this.save.bind(this)
        this.cancel = this.cancel.bind(this)
        this.saveAddress = this.saveAddress.bind(this)
        this.saveDescription = this.saveDescription.bind(this)
        this.deleteStudent = this.deleteStudent.bind(this)
        this.updateName = this.updateName.bind(this)
        this.updateCity = this.updateCity.bind(this)
        this.updateProfile = this.updateProfile.bind(this)

    }
    save(value){
        const filteredStudents = campus.students.filter((student) => student.id !== value)
       this.props.updateCampusName(value, this.props.id, filteredStudents)
    }
    updateCity(value) {
       this.props.updateTheCity(value, this.props.id)
       value='Update Profile pic'
    }
    updateName(value){
        this.props.newName(value,this.props.id)
    }
    saveAddress(value){
        this.props.updateCampusAddress(value, this.props.id)
    }
    saveDescription(value){
        this.props.updateCampusDescription(value, this.props.id)
    }
    deleteStudent(value){
        this.props.unregisterStudent(value)
    }
    updateProfile(value){
        this.props.updateProfilePicture(value, this.props.id)
    }
    cancel(){
        console.log(this.state.campusName)
    }
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
    const { save, cancel, saveAddress, updateProfile, updateCity, saveDescription, deleteStudent, updateName } = this
    const { campusName } = this.state
    const keys = Object.keys(campusStudents)
    console.log(campus.city)
    const bird = []
    for (let key of keys){
        let newBird = campusStudents[key]
        bird.push(newBird)
    }
    return (
      <div>
        <GridWrapper style={{width: '90vw', height: '60vw'}}>
        <div style={{ width: '90vw' }}>
        <section class="h-13 gradient-custom-2" >
            <div class="py-10 h-30">
                <div class="row d-flex h-100" style={{width: '2300px'}}>
                <div class="">
                    <div class="card" >
                        <div class="rounded-top text-white d-flex flex-row" style={{backgroundColor: '#000', height: '200px', width: '90vw'}}>
                            <div class="ms-4 mt-5 d-flex flex-column" style={{width: '150px', marginLeft: '20px'}}>
                                <img src={campus.profilePicture}
                                    alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
                                    style={{width: '150px', minWidth:'150px', minHeight:'150px', zIndex: 1}} />
                                <div style={{ width: '700px', marginTop: '10px', zIndex: '200', fontWeight: 'bold', color: 'black', fontSize: '18px'}}>
                                    <div> 
                                    <EasyEdit
                                        type="text"
                                        onSave={updateProfile}
                                        onCancel={cancel}
                                        saveButtonLabel="Save Me"
                                        cancelButtonLabel="Cancel Me"
                                        attributes={{ name: "awesome-input", id: 1}}
                                        instructions="Update Campus's Profile picture"
                                        placeholder='Edit Profile Picture'
                                        value='Update Profile Pic'
                                    />
                                    </div>
                                </div>
                            </div>
                            <div class="ms-3" style={{marginTop: '130px', marginLeft:'20px'}}>
                            <h5>
                                <EasyEdit
                                    type="text"
                                    onSave={updateName}
                                    onCancel={cancel}
                                    saveButtonLabel="Save Me"
                                    cancelButtonLabel="Cancel Me"
                                    attributes={{ name: "awesome-input", id: 1}}
                                    instructions="Update Campus's name"
                                    placeholder={campus.name}
                                    value={`${campus.name}`}
                                />
                            </h5>
                                <p> 
                                <EasyEdit
                                    type="text"
                                    onSave={updateCity}
                                    onCancel={cancel}
                                    saveButtonLabel="Save Me"
                                    cancelButtonLabel="Cancel Me"
                                    attributes={{ name: "awesome-input", id: 1}}
                                    instructions="Update Campus's city"
                                    placeholder={campus.city}
                                    value={`${campus.city}`}
                                />
                                </p>
                            </div>
                        </div>
                        <div class="p-4 text-black" style={{backgroundColor: '#f8f9fa', width: '90vw'}} >
                            <div class="d-flex justify-content-end text-center py-1">
                            <div>
                                <p class="mb-1 h5">{campusStudents.length}</p>
                                <p class="small text-muted mb-0">Students Enrolled</p>
                            </div>
                            {/* {/* <div class="px-3">
                                <p class="mb-1 h5">1026</p>
                                <p class="small text-muted mb-0">Followers</p>
                            </div> */}
                            </div>
                        </div>
                        <div class="card-body p-4 text-black" style={{}}>
                                <div class="mb-5">
                                <p class="lead fw-normal mb-1">School Description</p>
                                <div class="p-4" style={{backgroundColor: '#f8f9fa'}}>
                                    <p class="font-italic mb-1">{campus.description}</p>
                                </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center mb-4">
                                    <p class="lead fw-normal mb-0">Students Enrolled</p>
                                    {/* <p class="mb-0"><a href="#!" class="text-muted">Show all</a></p> */}
                                </div>
                                <div>
                                    <Table bordered hover>
                                        <thead>
                                            <tr>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>GPA </th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {bird.length > 0 ? bird.map(theStudent => {
                                            return (
                                                <tr>
                                                    <td>{theStudent.firstName}</td>
                                                    <td> {theStudent.lastName} </td>
                                                    <td> {theStudent.gpa} </td>
                                                    <td> 
                                                        <button 
                                                        onClick={() => 
                                                        deleteStudent({studentId: theStudent.id, campusId: theStudent.campusId, students:campus.students.filter((student) => student.id !== theStudent.id)})}> Unregister</button>
                                                    </td>
                                                </tr>
                                            )
                                        }) : 
                                        <tr>
                                            <td colSpan={6}>
                                            <div >
                                                <div style= {{ height: '200px'}} > 
                                                        <div style={{ textAlign: 'center', justifyContent: 'center', marginTop: '150px' }}>
                                                            <h3>
                                                                <BsClipboardData /> No Students Enrolled
                                                            </h3>
                                                            <h5> 
                                                                <Link to={'/students'}>
                                                                <Button variant="secondary"> Create Student </Button>
                                                                </Link> 
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
         </GridWrapper>
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
        campusStudents,
        id
    }
}

const mapDispatch = (dispatch, { history }) => {
    return {
        load: () => {
            dispatch(fetchCampuses()),
            dispatch(fetchStudents())
        },
        updateCampusName: (value, id) => dispatch(updateName({value: value, id: id, })),
        updateCampusAddress: (value, id) => dispatch(updateAddress({ value:value, id:id })),
        updateCampusDescription: (value, id) => dispatch(updateDescription({ value: value, id: id })),
        unregisterStudent: (value) => dispatch(removeStudentFromCampus(value, history)),
        newName: (value, id) => dispatch(updateTheName({ value: value, id: id })),
        updateTheCity: (value, id) => dispatch(updateCampusCity({ value: value, id: id })),
        updateProfilePicture: (value, id) => dispatch(updateThePhoto({ value: value, id: id }))
    }
}

export default connect(mapState, mapDispatch)(Campus)