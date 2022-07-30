import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCampuses, fetchStudents, deleteCampus } from '../store'
import CampusesModal from './CampusesModal'
import { Button } from 'react-bootstrap'
import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import Filters from './Filters'

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;
  
  const HeadWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 3em;
  margin-right: 6em;
  border-bottom: 1px solid #dadce5;
  width: 100vw;
  margin-bottom: 20px

`;
class Campuses extends Component {
    constructor(){
        super()
        this.state = {
            
        }
        this.remove = this.remove.bind(this)
        this.average = this.average.bind(this)
    }
    remove(campus){
        this.props.removeCampus(campus)
    }
    average(students) {
        let total = 0
        for (let i = 0; i < students.length; i++){
            let student = students[i]
            total += student.gpa * 1
        }
        let newTotal = total/students.length
        return newTotal
      }
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
    const { remove } = this
    return (
      <div>
            <div>
                <div>
                <HeadWrapper>
                    <div>
                        <div style={{
                            display: 'inline-block',
                            }}>
                            <div style={{
                                display: 'inline-block',
                            }}> 
                            <h2 style={{marginLeft: '1.5em', marginBottom: '15px'}}> Campuses </h2>                            </div>
                            <div style={{
                                display: 'inline-block',
                                position: 'relative',
                                left: '595px',
                            }}> 
                                <CampusesModal /> 
                            </div>
                        </div>
                    </div>
                 </HeadWrapper>
                <GridWrapper>
                {/* <Filters /> */}
                  <div style={{
                        height: '45px',
                        border: '1px solid #dadce5',
                        backgroundColor: 'white',
                        marginBottom: '-10px'
                    }}>
                        <div>
                            <div style={{display: 'inline-block'}}>
                                <p style={{ textIndent: '10px', fontSize: '18px', marginTop: '7px' }}> Campuses ({campuses.length}) </p>                           
                            </div>
                            <div style={{display: 'inline-block', float:'right', paddingRight: '10px'}}>
                                {/* <p style={{ textIndent: '10px', fontSize: '18px', marginTop: '7px' }}>  </p>                            */}
                            </div>
                        </div>
                    </div>
                     <Table bordered hover>
                        <thead>
                            <tr>  
                            <th>Campus Name</th>
                            <th>Address</th>
                            <th>Description</th>
                            <th> Students </th>
                            <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campuses.map(campus => {
                                return (
                                    <tr key={campus.id}>
                                    <td> <Link to={`/campuses/${campus.id}`}> {campus.name} </Link></td>
                                    <td>{campus.address}</td>
                                    <td>{campus.description}</td>
                                    <td> 
                                            {campus.students ? campus.students.map(
                                                student => {
                                                    return (
                                                        <div key={student.id}>
                                                            {student.firstName ? <Link to={`/students/${student.id}`}>  {`${student.firstName}`} </Link> : 'loading'} {student.lastName}
                                                        </div>
                                                    )
                                                }
                                            ) : 
                                            campus.name
                                        }
                                    </td>
                                    <td> <Button variant="danger" onClick={()=> remove(campus.id)}>Delete School</Button></td>
                                </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </GridWrapper>
                </div>
            </div>
      </div>
    )
  }
}

const mapState = (state) => {
    return {
        students: state.students,
        campuses: state.campuses.sort((a,b) => a.id - b.id)
    }
}
const mapDispatch = (dispatch) => {
    return {
        load: () => {
            dispatch(fetchCampuses())
            dispatch(fetchStudents())
        },
        removeCampus: (campus) => dispatch(deleteCampus(campus))
    }
}
export default connect(mapState, mapDispatch)(Campuses)