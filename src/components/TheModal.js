import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { createStudent } from '../store'

class TheModal extends Component {
    constructor(){
    super()
    this.state = {
        show: false,
        firstName: '',
        lastName: '',
        imageUrl: '',
        email: '',
        gpa: '',
        campus: ''
    },
        this.handleClose = this.handleClose.bind(this),
        this.handleShow = this.handleShow.bind(this)
        this.save = this.save.bind(this)
    }
    save(){
        this.props.save({ 
            firstName: this.state.firstName, 
            lastName: this.state.lastName, 
            email: this.state.email, 
            imageUrl: this.state.imageUrl, 
            gpa: this.state.gpa * 1,
            campusId: this.state.campus
        })
        this.setState({ show: false , firstName: '', lastName: '', email: '', gpa: '', imageUrl: ''})
    }
    handleClose () {
        this.save()
    }
    handleShow () {
     this.setState({ show: true })
    }
  render() {
    const { show, firstName, lastName, email, gpa, imageUrl, campus } = this.state
    const { campuses } = this.props
    const { handleClose, handleShow } = this

    return (
      <div>
           <>
           <div>
                <div>
                    <Button variant="primary" onClick={handleShow}>
                            Create Student
                    </Button> 
                </div>
            </div>          
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                    <Modal.Title>Modal heading</Modal.Title>
                    <button onClick={() => this.setState({ show: !show })}> X </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <form> 
                                <input type='text' value={firstName} onChange={(e) => this.setState({ firstName: e.target.value })} placeholder= 'firstName' />
                                <input type='text' value={lastName} onChange={e => this.setState({ lastName: e.target.value })} placeholder= 'lastName'  />
                                <input type='text' value={email} onChange={e => this.setState({ email: e.target.value })} placeholder= 'email'  />
                                <input type='text' value={imageUrl} onChange={e => this.setState({ imageUrl: e.target.value })} placeholder= 'imageURl'  />
                                <input type='text' value={gpa} onChange={e => this.setState({ gpa: e.target.value })} placeholder= 'GPA'  />
                                <select onChange={(e) => this.setState({ campus: e.target.value })}>
                                    <option value={campus} > --select an option -- </option>
                                    {campuses.map(campus => {
                                        return (
                                            <option key={campus.id} value={campus.id}> {campus.name} </option>
                                        )
                                    })}
                                </select>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
                </>
      </div>
    )
  }
}

const mapState = (state) => {
    return {
        campuses: state.campuses || {},
        students: state.students || {}
    }
}

const mapDispatch = (dispatch, {history}) => {
    return {
        save: (efe) => dispatch(createStudent(efe, history))
    }
}

export default connect(mapState, mapDispatch)(TheModal)