import { InputPicker, DateRangePicker } from 'rsuite'
import { useState } from 'react'
import { connect } from 'react-redux'
import { fetchCampuses, fetchStudents, setTheSelect } from '../store'
import React, { Component } from 'react'

class Filters extends Component {
    constructor(){
        super()
        this.state = {
            filterSelection: 'all'
        }
        this.handleSelection = this.handleSelection.bind(this)
    }
    handleSelection(value){
        this.props.homeSelect(value)
       console.log(value)
    }

    componentDidMount(){
        try {
            this.props.load()
        }
        catch(err){
            console.log(err)
        }
    }
    render(){
    const {campuses} = this.props
    const { handleSelection } = this

    return (
    <div>
        <div style={{ height: '68px', width: '90vw', border: '1px solid #dadce5',
              boxShadow: '0 1px 1px rgb(0 0 0 / 19%)',
              borderRadius: '3px',
              zIndex: '2',
              padding: '0 16px',
              margin: '0px 0px 16px',
              backgroundColor: 'white'
              }}>
                <div style={{ alignItems: 'center',  marginLeft:'20px', height: '66px', width: '85vw'  }}>
                      <div className="global-filters-top" style={{ display: 'flex', marginTop: '2.8px', height: '56px', justifyContent: 'space-between', width: '100%'}}>
                          <div className="filters" 
                            style={{ 
                                marginLeft: '-1em', 
                                WebkitBoxPack: 'justify',  
                                WebkitBoxOrient: 'horizontal',
                                WebkitBoxDirection: 'normal display', 
                                display: 'flex', 
                                alignItems: 'center', 
                                flexFlow: 'row wrap', 
                                WebkitBoxAlign: 'center'
                            }}> 
                              <div style={{marginRight: '8px'}}>
                                    <select 
                                        onChange={(e) => handleSelection(e.target.value) }
                                        style={{
                                            height: '35px', 
                                            borderRadius: '10px', 
                                            width: '150px',
                                            padding: '5px',
                                            fontSize: '16px',
                                            lineHeight: '1',
                                            border: 0,
                                            backgroundPositionX: '244px',
                                            border: '2px solid #dadce5',
                                            backgroundImage: 'url(data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E)',
                                            backgroundRepeat: 'no-repeat, repeat',
                                            backgroundPosition: 'right .7em top 50%, 0 0',
                                            backgroundSize: '.65em auto, 100%',
                                            MozAppearance: 'none',
                                            WebkitAppearance:'none',
                                            appearance: 'none',
                                            textIndent: '4px'
                                    }}>
                                        <option value='all'>
                                            All Campuses
                                        </option>
                                        {campuses.map(campus => {
                                            return (
                                                <option key={campus.id} value={campus.id}>
                                                    {campus.name}
                                                </option>
                                            )
                                        })}
                                    </select>
                              </div>
                              <div style={{marginRight: '8px', float: 'right'}}> 
                                {/* insert filter here */}
                              </div>
                              <div>
                                {/* insert filter here */}
                              </div>
                            </div>
                      </div>
                </div>
            </div>
    </div>
  )
 }
}

const mapState = (state) => {
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
        },
        homeSelect: (value) => {
            dispatch(setTheSelect(value))
        }
    }
}

export default connect(mapState, mapDispatch)(Filters)