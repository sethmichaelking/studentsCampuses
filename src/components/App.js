import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Students from './Students'
import Campuses from './Campuses'
import Home from './Home'
import Student from './Student'
import Campus from './Campus'
import Sidebar from './Sidebar'
import Login from './Login'
import { connect } from 'react-redux'
import Register from './Register'
import Analytics from './Analytics'
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: this.props.isAuth,
      isLoggedIn: ''
    }
  }

  componentDidMount(){
      this.setState({ user: this.props.isAuth })
      this.setState({ isLoggedIn: this.props.loggedInUser })

  }
  componentDidUpdate(prevProps){
    //this works but on refresh it goes away, the same thing happens with redux isAuth value in the store. 
    //On page refresh, the isAuth value is cleared.
    //This code is saying the isAuth is empty at first, then it gets the isAuth
    if(prevProps.isAuth.length === 0 && this.props.isAuth.length === 1){
      this.setState({ user: this.props.isAuth })
    if(prevProps.loggedInUser.length === 0 && this.props.loggedInUser.length === 1){
        this.setState({ loggedInUser: this.props.loggedInUser })
    }
  }
}
  render() {
    return (
      <div style={{
        maxWidth: '100%',
        overflowX: 'hidden'
      }}>
      <Router>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>
        <Sidebar />
          <Switch>
            <Route path='/home' component = {Home}/> 
            <Route exact path='/students' component={ Students}/>
            <Route exact path='/campuses' component = { Campuses }/>
            <Route path='/students/:id' component={Student} />
            <Route path='/campuses/:id' component={Campus} />
            <Route path='/analytics' component={Analytics} />
          </Switch>
        </Router>
      </div>
    )
  }
}


const mapState = (state) => {
  return {
    isAuth: state.isAuthenticated || {},
    loggedInUser: state.loggedInUser || {}
  }
}

export default connect(mapState, null)(App)