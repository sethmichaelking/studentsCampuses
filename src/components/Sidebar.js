import React, { Component } from 'react'
import styled from 'styled-components'
import Alert from 'react-bootstrap/Alert';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { gapi } from "gapi-script";
import axios from 'axios';

const StyledSideNav = styled.div`
  position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
  height: 100%;
  width: 75px;     /* Set the width of the sidebar */
  z-index: 99999;      /* Stay on top of everything */
  height:100%;      /* Stay at the top */
  background-color: #f4f4f7; /* Black */
  overflow-x: hidden;     /* Disable horizontal scroll */
  border-right: 1px solid #dadce5;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%)
`;

const StyledNavItem = styled.div`
  height: 90px;
  border-bottom: 1px solid #dadce5;
  width: 75px; /* width must be same size as NavBar to center */
  text-align: center; /* Aligns <a> inside of NavIcon div */
  margin-bottom: 0;   /* Puts space between NavItems */
  a {
    font-size: 2.9em;
    textDecoration: underline;
    color: ${(props) => props.active ? "#2a2c35" : "#9a9ca5"};
    :hover {
      opacity: 0.7;
      text-decoration: none; /* Gets rid of underlining of icons */
    }  
  }
  // background: ${(props) => props.active ? "lightskyblue" : ""};
`;

class NavItem extends Component {
    constructor(){
        super()
        this.state = {

        }
        this.handleClick = this.handleClick.bind(this)
        this.signOut = this.signOut.bind(this)

    }
    handleClick(){
        const { path, onItemClick } = this.props
        onItemClick(path)
    }
    async signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
        document.location.href="/#/login";
        const logUserOut = async() => {
          await axios.get('/logout')
        }
        logUserOut()
      });
      const logUserOut = async() => {
        await axios.get('/logout')
      }
      logUserOut()
    }
    componentDidMount(){
      // this.props.path === '/home'
      // this.props.active === '/home'
      // this.props.onItemClick('/home')
    }
    // I decided to comment this out because this is no longer necesary now that I've changed the google script running in index.html that pulls from the google api
    // componentDidMount(){
    // //   try{
    // //   // function onLoad() {
    // //   //   gapi.load('auth2', function() {
    // //   //     gapi.auth2.init();
    // //   //   });
    // //   }
    // //   onLoad()
    // //     .then(()=> {

    // //     })
    // //  }
    // //  catch(err){
    // //   console.log(err)
    // //  }
    // }
  render() {
    const { active } = this.props
    const { handleClick, signOut } = this
    return (
      <StyledNavItem active={this.props.name === 'Logout' ? active === '/#/home' : active}> 
        <Link 
            to={this.props.path} 
            style={{
              marginTop: '19px', 
              fontSize: '35px',
            }} 
            className={this.props.css} 
            onClick={this.props.name === 'Logout' ? signOut : handleClick}

          >
            <div 
              style={{ 
              fontFamily: 'sans-serif',
              fontSize: '12px',
              // textDecoration: 'underline', 
            }}> 
              {this.props.name}
            </div>
        </Link>
      </StyledNavItem>
    )
  }
}




class Sidenav extends Component {
    constructor(props) {
        super(props);

        this.state = {
          activePath: props.location.pathname,
          items: [
            {
              path: '/home', /* path is used as id to check which NavItem is active basically */
              name: 'Home',
              css: 'fa fa-fw fa-archive',
              key: 1 /* Key is required, else console throws error. Does this please you Mr. Browser?! */
            },
            {
              path: '/students',
              name: 'Students',
              css: 'fa fa-fw fa-industry',
              key: 2
              },
            {
              path: '/campuses',
              name: 'Campus',
              css: 'fa fa-fw fa-folder',
              key: 3
            },
            {
              path: '/analytics',
              name: 'Analytics',
              css: "fa-solid fa-chart-line",
              key: 4
            },
            {
              path: '/login',
              name: 'Logout',
              css: 'fa fa-fw fa-arrow-right-from-bracket',
              key: 5
            },
          ]
        }  
      this.onItemClick = this.onItemClick.bind(this)
    } 

    onItemClick = (path) => {
        this.setState({ activePath: path })
    }
  render() {
    const  { items, activePath } = this.state
    return (
      <div>
        <StyledSideNav>
        {
        /* items = just array AND map() loops thru that array AND item is param of that loop */
        items.map((item) => {
          /* Return however many NavItems in array to be rendered */
          return (
            <NavItem 
            path={item.path} 
            name={item.name} 
            css={item.css} 
            onItemClick={this.onItemClick} 
            active={item.path === activePath} 
            key={item.key}/>
          )
        })
      }
        </StyledSideNav>
      </div>
    )
  }
}

const RouterSideNav = withRouter(Sidenav)


export default class Sidebar extends Component {
  render() {
    return (
      <div>
        <RouterSideNav />
      </div>
    )
  }
}
