import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCampuses, fetchStudents, updateAddress, updateThePhoto, updateCampusCity, updateName, updateDescription, updateTheName, removeStudentFromCampus } from '../store'
import EasyEdit from 'react-easy-edit';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import {
    BsClipboardData
  } from 'react-icons/bs'
import TheModal from './TheModal';

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 8em;
  margin-right: 65em;
`;

class Campus extends Component {
    constructor(props){
        super(props)
        this.state = {
            campusName: '',
            someStudents: 0,
            updatePro: 'Update Profile Picture'
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
        this.setState({ updatePro: 'upadte with url' })
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
    const { campus, students } = this.props
    const { cancel, updateProfile, updateCity, deleteStudent, updateName, setTheState } = this
    const { updatePro} = this.state
    return (
      <div >
        <GridWrapper style={{width: '90vw', height: '60vw'}}>
        <div style={{ width: '90vw' }}>
        <section className="h-13 gradient-custom-2" >
            <div className="py-10 h-30">
                <div className="row d-flex h-100" style={{width: '2300px'}}>
                <div className="">
                    <div className="card" >
                        <div className="rounded-top text-white d-flex flex-row" style={{backgroundColor: '#000', height: '200px', width: '90vw'}}>
                            <div className="ms-4 mt-5 d-flex flex-column" style={{width: '150px', marginLeft: '20px'}}>
                                <img src={campus.profilePicture}
                                    alt="Generic placeholder image" cclass="img-fluid img-thumbnail mt-4 mb-2"
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
                                        value={updatePro}
                                    />
                                    </div>
                                </div>
                            </div>
                            <div className="ms-3" style={{marginTop: '130px', marginLeft:'20px'}}>
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
                                <div> 
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
                                </div>
                            </div>
                        </div>
                        <div className="p-4 text-black" style={{backgroundColor: '#f8f9fa', width: '90vw'}} >
                            <div className="d-flex justify-content-end text-center py-1">
                            <div>
                                <p className="mb-1 h5"> {campus && students ? students.filter(student => student.campusId === campus.id).length : '0'} </p>
                                <p className="small text-muted mb-0">Students Enrolled </p>
                            </div>
                            </div>
                        </div>
                        <div className="card-body p-4 text-black" style={{height: '60vh'}}>
                                <div className="mb-5">
                                    <p className="lead fw-normal mb-1">School Description</p>
                                    <div className="p-4" style={{backgroundColor: '#f8f9fa'}}>
                                        <p className="font-italic mb-1">{campus.description}</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <p className="lead fw-normal mb-0">Students Enrolled</p>
                                </div>
                                <div>
                                    <div style={{
                                        height: '45px',
                                        border: '1px solid #dadce5',
                                        backgroundColor: 'white',
                                        marginBottom: '-1px'
                                    }}>
                                    <div>
                                        <div style={{display: 'inline-block'}}>
                                                <p style={{ textIndent: '10px', fontSize: '18px', marginTop: '7px' }}> Students ({campus && students ? students.filter(student => student.campusId === campus.id).length : '0'}) </p>                           
                                        </div>
                                        <div style={{display: 'inline-block', float:'right', paddingRight: '10px'}}>
                                                {/* <p style={{ textIndent: '10px', fontSize: '18px', marginTop: '7px' }}>  </p>                            */}
                                        </div>
                                    </div>
                                    </div>
                                    <Table style={{ 
                                                    backgroundColor: 'white', 
                                                    borderLeft: 'thin solid #dadce5',
                                                    borderRight: 'thin solid #dadce5', borderTop: 'thin solid #dadce5', borderBottom: 'thin solid #dadce5'}} 
                                                    hover>
                                        <thead>
                                            <tr style={{ borderBottom: 'thin solid #dadce5', backgroundColor: '#f4f4f7', color: '#1a1c25'}}>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>GPA </th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {campus && students ?
                                              <>
                                                {students.filter(student => student.campusId === campus.id).length > 0 ? students.filter(student => student.campusId === campus.id).map(thestudent => {
                                                    return (
                                                        <tr key={thestudent.id}>
                                                            <td>
                                                                <Link to={`/students/${thestudent.id}`}>
                                                                {thestudent.firstName}
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                {thestudent.lastName}
                                                            </td>
                                                            <td>
                                                                {thestudent.gpa}
                                                            </td>
                                                            <td> 
                                                                <button 
                                                                onClick={() => 
                                                                deleteStudent({
                                                                    studentId: thestudent.id, 
                                                                    campusId: thestudent.campusId, 
                                                                    students: campus.students.filter((student) => student.id !== thestudent.id)
                                                                })}> Unregister</button>
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
                                                                    <BsClipboardData /> Create {campus.name}'s first student
                                                                </h3>
                                                                <h5> 
                                                                     <TheModal />
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>}
                                              </>
                                            : 
                                            <tr>
                                            <td colSpan={6}>
                                            <div >
                                                <div style= {{ height: '200px'}} > 
                                                        <div style={{ textAlign: 'center', justifyContent: 'center', marginTop: '150px' }}>
                                                            <h3>
                                                                <BsClipboardData /> Loading Data
                                                            </h3>
                                                            <h5> 
                                                                 <TheModal />
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
    return {
        students: state.students,
        campuses: state.campuses,
        campus,
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