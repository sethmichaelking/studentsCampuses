import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { removetStudent } from '../store'
import { BiTrafficCone, BiTrash } from 'react-icons/bi';

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
        this.handleShow = this.handleShow.bind(this),
        this.deleteStudent = this.deleteStudent.bind(this)
    }
    deleteStudent(id) {
        this.props.removeStudent(id)
        this.setState({ show: false })
    }
    handleClose () {
        this.setState({ show: false })
    }
    handleShow () {
     this.setState({ show: true })
    }
  render() {
    const { show } = this.state
    const { handleClose, handleShow, deleteStudent } = this
    const { student } = this.props
    return (
      <div>
           <>
                <div style={{ 
                    marginTop: '0px',
                    marginLeft: '12px'
                 }}variant="primary" onClick={handleShow}>
                    <BiTrash style={{ 
                         marginTop: '0px',
                         marginLeft: '12px'
                    }} />
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                    <Modal.Title>Delete Student?</Modal.Title>
                    <button onClick={() => this.setState({ show: !show })}> X </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            You won't be able to recover the student later. Are you sure you want to delete the student?
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => deleteStudent(student)}>
                        Delete
                    </Button>
                    </Modal.Footer>
                </Modal>
                </>
      </div>
    )
  }
}

const mapState = (state, otherProps) => {
    const student = otherProps.theStudent
    return {
        campuses: state.campuses || {},
        students: state.students || {},
        student
    }
}

const mapDispatch = (dispatch) => {
    return {
        removeStudent: (id) => dispatch(removetStudent(id))
    }
}

export default connect(mapState, mapDispatch)(TheModal)