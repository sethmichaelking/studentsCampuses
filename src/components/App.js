import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Students from './Students'
import Campuses from './Campuses'
import Home from './Home'
import Student from './Student'
import Campus from './Campus'
import Sidebar from './Sidebar'
import NavigationBar from './NavigationBar'


export default class App extends Component {
  render() {
    return (
      <div style={{
        maxWidth: '100%',
        overflowX: 'hidden'
      }}>
      {/* <NavigationBar /> */}
      <Router>
        <Sidebar />
          <Switch>
            <Route path='/home' component = {Home}/>
            <Route exact path='/students' component={ Students}/>
            <Route exact path='/campuses' component = { Campuses }/>
            <Route path='/students/:id' component={Student} />
            <Route path='/campuses/:id' component={Campus} />
          </Switch>
        </Router>
      </div>
    )
  }
}
