import React, { Component } from 'react';
class LoginForm extends Component {
    
    //Login form with input fields and buttons to login on the page if you allready have an account.
    //Click on cancel to remove the form.
    
    state = {
        error: false
    }
    
    render() {
        
        
        
     return (            
            
        <div className="reg-form" style={{maxWidth: '50%', margin: '5rem auto'}}>
            <h3>Login</h3>
            <form onChange={this.props.onChange}>
                <div className="reg-input">
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input 
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Enter E-mail"
                        onChange={this.props.onChange}
                        value={this.props.email}
                        />
                        {this.state.error && <h3> Wrong Username! </h3>}
                    </div>
                
                    <div>
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        name="password"
                        placeholder="Password"
                        onChange={this.props.onChange}
                        value={this.props.password}
                        />   
                        {this.state.error && <h3> Wrong Password! </h3>}
                    </div>
                </div>
            <input 
            onClick={this.props.login} 
            type="submit" 
            value="Login"/>
            
            <input 
            onClick={this.props.cancel} 
            type="button" 
            value="Cancel"/> 

            </form>
        </div>
        );
    }
 }
    
    export default LoginForm;