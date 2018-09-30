import React, { Component } from 'react';

class Navbar extends Component {
  state = { 
    user: ''
  }
  
  render() {
    
    const userState = this.props.user;

    return (
      <div className="navbar">
        <div>
          {!userState && <h1>Welcome to Reacting Waves</h1> }
          {userState && <h1>Reacting Waves</h1> }
        </div>
        <div>
          { !userState && <input 
            type="button" 
            name="logBtn"
            value="Login" 
            onClick={this.props.loginBtn} />        
          }
          
          { !userState &&  <input 
            className="input-button" 
            type="button" 
            name="regBtn"
            value="Register"
            onClick={this.props.regBtn} /> 
          }
            {userState && <h4>Logged in as: {userState.email} </h4>}
          
          { userState &&  <input
            className="signout-button" 
            type="button" 
            value="Sign Out" 
            onClick={this.props.signOut } /> 
          } 
        </div>
      </div> 
      );
    }
  }
  
  export default Navbar;