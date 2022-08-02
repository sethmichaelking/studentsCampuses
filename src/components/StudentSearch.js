import { InputPicker, DateRangePicker } from 'rsuite'
import { useState } from 'react'
import { connect } from 'react-redux'
import { fetchCampuses, fetchStudents, setSearch, setTheSelect } from '../store'
import React, { Component } from 'react'

class Filters extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputVal: "",
            showDelete: false
        }
        this.setInputVal = this.setInputVal.bind(this)
        this.saveInput = this.saveInput.bind(this)
        this.clearInput = this.clearInput.bind(this)
    }
    clearInput(val){
        console.log("clearval", val, "typeof val", typeof val)
        this.setState({ inputVal: '' })
        this.setState({ showDelete: true })
    }
    setInputVal(val) {
        this.setState({inputVal: val})
    }
    saveInput(val){
        console.log("val", val, "typeof val", typeof val)
        this.props.getSearch(val)
        this.setState({ showDelete: true })
    }
    // select an option programtticaly wiyh react
    componentDidMount(){
        try {
            this.props.load()
        }
        catch(err){
            console.log(err)
        }
    }
    render(){
    const {campuses, selected} = this.props
    const { setInputVal, saveInput, clearInput } = this
    const { inputVal } = this.state
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
                             <div className="input-group col-md-4" style={{marginRight: '-38px', marginLeft: '-20px', width: '800px'}}>
                                <input className="form-control py-2" type="search" placeholder='search students' value={inputVal} onChange={(e) => {this.setState({ inputVal: e.target.value})}} id="example-search-input"></input>
                                <span className="input-group-append">
                                    <button className="btn" type="button" disabled={inputVal.length === 0} style={{border: 'thin solid #dadce5'}} onClick={() => saveInput(inputVal)}>
                                        {inputVal.length > 0 ? 
                                            <i 
                                                className="fa fa-search">
                                            </i> 
                                                : 
                                            <i onClick={() => clearInput(inputVal)}  className="fa fa-minus-circle"></i>
                                        }
                                    </button>
                                </span>
                            </div>
                             {/* <div style={{display: 'inline-block', fontFamily: 'sans-serif'}}> 
                                <input placeholder="Search by Organization" className='iconSearchHeader' onChange={(e) => setInputVal(e.target.value)} class='iconSearchHeader' style= {{ textIndent: '17px', width: '250px', height: '40px', borderRadius:'10px', boxShadow: 'none', border: 'solid 2px #dee2e6'}} type="search" name="" id="" />  
                            </div> */}
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
        campuses: state.campuses,
        selected: state.selected
    }
}

const mapDispatch = (dispatch) => {
    return {
        load: () => {
            dispatch(fetchCampuses())
            dispatch(fetchStudents())
        },
        getSearch: (search) => dispatch(setSearch(search))
    }
}

export default connect(mapState, mapDispatch)(Filters)