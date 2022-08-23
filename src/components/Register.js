import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { gapi } from "gapi-script";
import { connect } from 'react-redux';
import { setAuthTrue } from '../store'
import { Button } from 'react-bootstrap'
import {registerUser} from '../store'
import { Link } from 'react-router-dom';

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 0em;
  margin-left: 0em;
  margin-right: 65em;
`;

//setting up background color gradient
const color1 = "#A77AFF";
const color2 = "#B408A4";

class Register extends Component {
    constructor(){
        super();
        this.state = {
            welcomeMsg: '',
            subHeaderMsg: '',
            user: '',
            loading: false,
            email: '',
            password: ''
        }
        this.onSignIn = this.onSignIn.bind(this)
        this.signOut = this.signOut.bind(this)
        this.register = this.register.bind(this)
        // this.handleTime = this.handleTime.bind(this)
    }
    register(e){
        e.preventDefault()
        this.props.register({email: this.state.email, password: this.state.password})
        this.setState({ email: ''})
        this.setState({ password: '' })
    }
    signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
          res.clearCookie('session-token');
        });
      }

    async onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        //we'll use the below email onSigIn to then find the user in the datbase after their authed 
        // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        const email = profile.getEmail()
        this.setState({ user: email })
        var id_token = googleUser.getAuthResponse().id_token;
        async function send(){
           const response = await axios.post('/api/loginUser', {token: id_token})
           if (response.data === 'success'){
            location.assign('/#/home')
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
            });
           }
        }
        send()
            .then(async()=> {
                this.props.authenticated(email)
            })
    }

    componentDidMount() {   
        console.log('this mounted')
        gapi.signin2.render('my-signin2', {
            'scope': 'profile email',
            'width': 250,
            'height': 50,
            'longtitle': true,
            'background': '#fff center no-repeat url(https://cdn.pendo.io/img/google-signin.svg)',
            'border': 'none',
            'box-shadow': '0 2px 2px 0 rgb(0 0 0 / 24%), 0 0 2px 0 rgb(0 0 0 / 12%)',
            'theme': 'dark',
            'onsuccess': this.onSignIn,
            'border-radius': '10px'
        });
        const datad = new Date()
        let hrs = datad.getHours()

        if (hrs >= 10 && hrs <= 19){
            this.setState({ welcomeMsg: 'Good Afternoon!' })
            this.setState({ subHeaderMsg: 'Do students learn better after lunch? Find out.' })

        }
        if (hrs >= 19 && hrs < 24){
            this.setState({ welcomeMsg: 'Wait, why are you not sleeping?' })
            this.setState({ subHeaderMsg: 'Student are asleep. Finally you can get work done.' })

        }
        if (hrs >= 0 && hrs <= 10){
            this.setState({ welcomeMsg: 'Get your morning coffee, it is time to go' })
            this.setState({ subHeaderMsg: 'Early bird gets the worm, right?' })

        }
    }
   render() {
    const { welcomeMsg, subHeaderMsg, email, password } = this.state
    const { register } = this
    return (
      <div style={{height: '100vh', width: '100vw', overflowY: 'hidden'}}>
        <GridWrapper>
        <section style={{background: '#dadce5', width: '100vw'}}>
                <div style={{fontWeight: 'bold', marginLeft: '34px', marginTop: '13px'}}>
                 StudentTracker
                </div> 
                <div className="">
                    <div className="row d-flex justify-content-center align-items-center h-100" style={{marginTop: '20px'}}>
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5" style={{height: '100vh', marginTop: '10px'}}>
                        <div className="card bg-dark text-white" style={{borderRadius: '1rem', width: '80%', marginLeft: '10%', marginBottom: '6%'}}>
                        <div className="card-body p-5 text-center">

                            <div className="mb-md-5 mt-md-4 pb-5">

                            <h2 className="fw-bold mb-2"> Create Account</h2>
                            <p className="text-white-50 mb-5">Enter email and password below</p>

                            <div className="form-outline form-white mb-4">
                                <input placeholder='Email' value={email} onChange={(e)=> this.setState({ email: e.target.value })} type="email" id="typeEmailX" className="form-control form-control-lg" />
                            </div>

                            <div className="form-outline form-white mb-4">
                                <input placeholder='Password' value={password} onChange={(e)=> this.setState({ password: e.target.value })} type="password" id="typePasswordX" className="form-control form-control-lg" />
                            </div>
                             <div>
                                <div style={{display: 'inline-block', marginRight: '4%'}}>
                                        <Button variant="light" onClick={(e) => register(e) }> Register </Button>
                                </div>
                                <div style={{display: 'inline-block'}}>
                                    <Button style={{width: '130%'}}> 
                                         <Link to='/login' style={{color: 'black'}}> Login   </Link>
                                    </Button>
                                </div>
                            </div>
                            <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                                    <div>
                                        <div id="my-signin2" data-width="300" data-height="200" data-longtitle="true"> </div>
                                    </div>
                                    <br/>
                                </div>
                            </div>
                            <div>
                            <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
                            </p>
                            </div>

                        </div>
                        </div>
                    </div>
                    </div>
                </div>
        </section>
        </GridWrapper>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
    return {
    authenticated: (email) => {
         dispatch(setAuthTrue(email))
    },
    register: (user) => {
        dispatch(registerUser(user))
    }
  }
}

export default connect(null, mapDispatch)(Register)