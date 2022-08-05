import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react'
import { createSchool } from '../store'

class CampusesModal extends Component {
    constructor(){
        super()
        this.state = {
            show: false,
            name: '',
            address: '',
            description: '',
            imageUrl: ''
        }
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.save = this.save.bind(this)
    }
    save(){
        this.props.save({name: this.state.name, address: this.state.address, description: this.state.description, imageUrl: this.state.imageUrl, students: [] })
    }
    handleShow(){
        this.setState({ show: true })
    }
    handleClose(){
        this.save()
        this.setState({ name: '', address: '', description: '', imageUrl: ''})
        this.setState({ show: false })

    }
  render() {
    const { handleShow, handleClose } = this
    const { show, name, description, imageUrl, address } = this.state
    return (
      <div>
        <>
        <div>
            <Button variant="primary" onClick={handleShow}
            >
            Create Campus
            </Button>
        </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                <Modal.Title>Modal heading</Modal.Title>
                <button onClick={() => this.setState({ show: !show })}> X </button>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <input value={name} onChange={e => this.setState({ name: e.target.value })} placeholder='name'/>
                        <input value={imageUrl} onChange={e => this.setState({ imageUrl: e.target.value })} placeholder='imageUrl' />
                        <input value={address} onChange={e => this.setState({ address: e.target.value })} placeholder='address'/>
                        <input value={description} onChange={e => this.setState({ description: e.target.value })} placeholder='description' />
                    </form>
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
const mapState = state => {
    return {

    }
}

const mapDispatch = (dispatch, {history}) => {
    return {
        save: (efe) => dispatch(createSchool(efe, history))
    }
}

export default connect(mapState, mapDispatch)(CampusesModal)