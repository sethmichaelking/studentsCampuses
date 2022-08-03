import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { removetStudent, deleteCampus  } from '../store'
import { BiTrafficCone, BiTrash } from 'react-icons/bi';

class TheModal extends Component {
    constructor(){
    super()
    this.state = {
        show: false,
    },
        this.handleClose = this.handleClose.bind(this),
        this.handleShow = this.handleShow.bind(this),
        this.deleteTheCampus = this.deleteTheCampus.bind(this)
    }
    deleteTheCampus(id) {
        this.props.removeCampus(id)
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
    const { handleClose, handleShow, deleteTheCampus } = this
    const { campus } = this.props
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
                    <Modal.Title>Delete {campus.name}?</Modal.Title>
                    <button onClick={() => this.setState({ show: !show })}> X </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            You won't be able to recover {campus.name} later and students enrolled will become unenrolled.
                            <br>
                            </br>
                            <br>
                            </br>
                            Are you sure you want to delete {campus.name}?
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => deleteTheCampus(campus.id)}>
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
    const campus = otherProps.campus
    return {
        campuses: state.campuses || {},
        students: state.students || {},
        campus
    }
}

const mapDispatch = (dispatch) => {
    return {
        removeCampus: (id) => dispatch(deleteCampus(id))
    }
}

export default connect(mapState, mapDispatch)(TheModal)