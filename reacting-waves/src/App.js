import React, { Component } from 'react';
import firebase from './Firebase/firebase.js';
import Container from './Components/Container/Container.js';
import LoginForm from './Components/Forms/LoginForm.js';
import RegForm from './Components/Forms/RegForm.js';
import Navbar from './Components/Navbar/Navbar.js';
import Content from './Components/Content/Content.js';
import HomePage from './Components/Homepage/HomePage.js';
import './App.css';

class App extends Component {
  
  
  state = {
    regemail: '',
    regpassword: '',
    email: '',
    password: '',
    username: '',
    user: '',
    uid: '',
    error: false,
    logVisible: false,
    regVisible: false,
    loginButton: '',
    regButton: '',
    errorMsg: ''
  }
  
  onChange = (e) => {
    this.setState({[e.target.name] : e.target.value});
  }
  
  logVisible = () => {
    this.setState({logVisible: !this.state.logVisible,
      regVisible: false,
      errorMsg : ''
    });
  }
  
  regVisible = () => {
    this.setState({regVisible: !this.state.regVisible,
      logVisible: false,
      errorMsg : ''
    });
  }
  
  cancelOnClick = () => {
    this.setState({logVisible: false,
      regVisible: false, errorMsg : ''});
    }

    
  onSubmit = (e) => {
    e.preventDefault();
    
    firebase.auth().createUserWithEmailAndPassword(this.state.regemail, this.state.regpassword)
    .then((user) => {
      console.log(user);
      firebase.database().ref(`users/${user.user.uid}`)
      .set({ 
        email: user.user.email,
        userID: user.user.uid,
        userName: user.user.displayName
      });
      this.setState({errorMsg: ''});
    })
    .catch( error => this.setState({
      errorMsg: error.message }));
      
      this.setState({logVisible: false,
      regVisible: false, errorMsg : ''});
  }
      
  onAuthChanged = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {     
        this.setState({user: user});
        if(user.displayName) {
          this.setState({ userName: user.displayName });
        }
        else {
          return null;
        }
      }
      else {
        this.setState({user: ''});
      }
    });
  }  
  
  signIn = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(user =>  this.setState({errorMsg: ''}))
    .catch(error => this.setState({
      errorMsg: error.message}) )
      .catch(error => {
        console.log('You goofed', error);
      });
      
      this.setState({logVisible: false,
        regVisible: false, errorMsg : ''});
      }
      
      signOut = (e) => {
        e.preventDefault();
        
        this.setState({email: '', password: ''});
        firebase.auth().signOut();
        console.log('User signed out');
        window.location.reload();
  }
    
  componentDidMount() {
    this.onAuthChanged();
  }
  
  render() {
    
    return (
      <div className="App">
        <div className="App-header">
        <Navbar 
          username={this.state.username}
          user={this.state.user} 
          signOut={this.signOut} 
          loginBtn={this.logVisible} 
          regBtn={this.regVisible}
        />    
        </div>

        <Container>
          {!this.state.user && <HomePage /> }
          {this.state.errorMsg && <div className="errorMSG"> <p> { this.state.errorMsg } </p> </div>}
          {this.state.user && <Content
            user={this.state.user}
            /> }
          
          { ( !this.state.user && this.state.regVisible) ? <RegForm 
            regpassword={this.state.regpassword}
            regemail={this.state.regemail}
            username={this.state.username}
            onChange={this.onChange}
            register={this.onSubmit}
            error={this.state.errorMsg}
            cancel={this.cancelOnClick}
            /> : null }
            
          { (!this.state.user && this.state.logVisible) ? <LoginForm 
            password={this.state.password}
            email={this.state.email}
            onChange={this.onChange}
            login={this.signIn}
            error={this.state.errorMsg}
            cancel={this.cancelOnClick}
            /> : null }
            
            {this.state.user &&  <div className="form-group"> </div> }
        </Container>
      </div>
            );
          }
        }

export default App;
              