import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCampuses, fetchStudents, deleteCampus } from '../store'
import CampusesModal from './CampusesModal'
import { Button } from 'react-bootstrap'
import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import Filters from './Filters'
import DeleteCampusModal from './DeleteCampusModal'
import CampusSearch from './CampusSearch'
import {
    BsClipboardData 
  } from 'react-icons/bs'

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
        this.displayCampuses = this.displayCampuses.bind(this)
    }
    remove(campus){
        this.props.removeCampus(campus)
    }
      displayCampuses(campuses, campusSearch){
        if (campuses.length > 0 && campusSearch.length > 0){
            const foundCampus = campuses.filter(campus => campus.name.includes(campusSearch))
            // const students = this.props.campuses.find(campus => campus.id === foundStudent.campusId)
            if (foundCampus.length > 0){
            console.log('students and search length:', foundCampus.length)
            // this.updateStudentLength(foundStudent.length)
            return (
                foundCampus.map(campus => {
                        // const school = this.props.campuses.find(campus => campus.id === foundStudent.campusId)
                        return (
                            <tr key={campus.id}>
                                <td> <Link to={`/campuses/${campus.id}`}> {campus.name} </Link> </td>
                                <td> 
                                    <>
                                        <DeleteCampusModal campus={campus}/>
                                    </>
                                </td>
                                <td>{campus.address}</td>
                                <td> {campus.gpa} </td>
                            </tr>
                        )
                    })
            )
          } 
          console.log('nobody', 0)
        //   this.updateStudentLength(0)
          return (
            <>
            <tr style={{borderBottom: 'thin solid #dadce5'}}>
                    <td colSpan={6} style={{ borderBottom: 'thin solid #dadce5' }}>
                      <div >
                          <div style= {{ height: '200px', width: '87vw'}} > 
                                  <div style={{ textAlign: 'center', justifyContent: 'center', marginTop: '150px' }}>
                                      <h3>
                                        <BsClipboardData /> No campus found. 
                                      </h3>
                                      <h5 style={{ marginLeft: '20px', marginTop: '20px' }}> 
                                      <Button varient="secondary" onClick={()=> window.location.reload()}>Reset Filters</Button>
                                      </h5>
                                  </div>
                            </div>
                         </div>
                      </td>
                  </tr>
            </>
          )
        } 
        else if (campuses.length > 0){
            console.log('campuses length:', campuses.length)
            // this.updateStudentLength(campuses.length)
               return (
                campuses.map(campus => {
                    const studentsLength = this.props.students.filter(student => student.campusId === campus.id)
                    // const school = this.props.campuses.find(campus => campus.id === student.campusId)
                    console.log(studentsLength)
                    return (
                        <tr key={campus.id}>
                            <td> <Link to={`/campuses/${campus.id}`}> {campus.name} </Link> </td>
                            <td>{campus.address}</td>
                            <td> {campus.description} </td>
                            <td style={{textAlign: 'center'}}>
                                    {studentsLength.length}
                            </td>
                            <td> 
                                <>
                                    <DeleteCampusModal campus={campus}/>
                                </>
                            </td>
                        </tr>
                    )
                })
               )
        } 
        else if (campuses.length === 0){
            console.log('no campuses', campuses.length)
            // this.updateStudentLength(students.length)
              return (
            <>
            <tr style={{borderBottom: 'thin solid #dadce5'}}>
                    <td colSpan={6} style={{ borderBottom: 'thin solid #dadce5' }}>
                      <div >
                          <div style= {{ height: '200px', width: '87vw'}} > 
                                  <div style={{ textAlign: 'center', justifyContent: 'center', marginTop: '150px' }}>
                                      <h3>
                                        <BsClipboardData /> No campuses created 
                                      </h3>
                                      <h5 style={{ marginLeft: '-380px', marginTop: '20px' }}> 
                                            <CampusesModal style={{marginLeft: '200px'}}/> 
                                      </h5>
                                  </div>
                            </div>
                         </div>
                      </td>
                  </tr>
            </>
          )
        }
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
    const { students, campuses, campusSearch } = this.props
    const { remove, displayCampuses } = this
    return (
      <div>
            <div>
                <div>
                <HeadWrapper>
                    <div style={{width: '90vw'}}>
                        <div style={{
                            display: 'inline-block',
                            width: '92vw'
                            }}>
                            <div style={{
                                display: 'inline-block',
                            }}> 
                            <h2 style={{marginLeft: '1.5em', marginBottom: '15px'}}> Campuses </h2>                            </div>
                            <div style={{
                                display: 'inline-block',
                                position: 'relative',
                                float: 'right'
                            }}> 
                            <CampusesModal />
                            </div>
                        </div>
                    </div>
                 </HeadWrapper>
                 <div style={{ borderTop:  '1px solid #dadce5', marginTop: '-20px', height: '100vh', backgroundColor: '#f4f4f7'}}>
                    <div>
                        <GridWrapper>
                        <CampusSearch />
                        <div style={{width: '90vw'}}>
                            <div style={{
                                    height: '45px',
                                    border: '1px solid #dadce5',
                                    backgroundColor: 'white',
                                    marginBottom: '-1px'
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
                                    <div>
                                        <Table style={{ 
                                                    backgroundColor: 'white', 
                                                    borderLeft: 'thin solid #dadce5',
                                                    borderRight: 'thin solid #dadce5', borderTop: 'thin solid #dadce5', borderBottom: 'thin solid #dadce5 !important'}} 
                                                    hover>
                                            <thead>
                                                <tr style={{ borderBottom: 'thin solid #dadce5', backgroundColor: '#f4f4f7', color: '#1a1c25'}}>  
                                                <th>Campus Name</th>
                                                <th>Address</th>
                                                <th>Description</th>
                                                <th style={{textAlign: 'center'}}> Students </th>
                                                <th> Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {displayCampuses(campuses, campusSearch)}
                                            </tbody>
                                            </Table>
                                    </div>
                                </div>
                            </GridWrapper>
                        </div>
                     </div>
                </div>
            </div>
            <div>
            </div>
      </div>
    )
  }
}

const mapState = (state) => {
    return {
        students: state.students,
        campuses: state.campuses.sort((a,b) => a.id - b.id),
        campusSearch: state.campusSearch
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