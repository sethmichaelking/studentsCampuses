import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCampuses, fetchStudents, setTheSelect} from '../store'
import styled from 'styled-components';
import { Bars } from 'react-loading-icons'
import ChartExample from './ChartExample';

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

const BodyWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 3em;
  margin-right: 6em;
  width: 100vw;
  margin-bottom: 20px
`;


class Analytics extends Component {
  constructor(){
    super()
    this.state = {
      loading: false,
      loggedInUser: ''
    }
  }

  componentDidMount(){
    try {
      this.props.load()
      this.setState({ 
        loading: true
      })
      setTimeout(()=> {
          tzehis.setState({ 
            loading: false
          })
      }, 1000)
    }
    catch(err){
      console.log(err)
    }
  }

  componentDidMount(){
    this.setState({ isLoggedIn: this.props.loggedInUser })
  }
  componentDidUpdate(prevProps){
    if(prevProps.loggedInUser.length === 0 && this.props.loggedInUser.length === 1){
      this.setState({ loggedInUser: this.props.loggedInUser })
    }
  }
  render() {
    return (
      <div>
       <HeadWrapper >
          <h2 style={{marginLeft: '1.5em', marginBottom: '15px'}}> Analytics </h2>
        </HeadWrapper>  
        <div style={{ borderTop:  '1px solid #dadce5', marginTop: '-20px', height: '100vh', backgroundColor: '#f4f4f7'}} >
         <div>
          <GridWrapper>
            <h3> Doughtnut Chart </h3>
                <ChartExample />
          </GridWrapper>
             </div>
            </div> 
        </div>
    )
  }
}

const mapState = (state, otherProps) => {
  return {
      students: state.students.sort((a,b) => b.gpa - a.gpa),
      campuses: state.campuses.sort((a,b) => a.id - b.id),
      select: state.selected,
      loggedInUser: state.loggedInUser
  }
}
const mapDispatch = (dispatch) => {
  return {
      load: () => {
          dispatch(fetchCampuses())
          dispatch(setTheSelect())
      }
   }
}

export default connect(mapState, mapDispatch)(Analytics)
