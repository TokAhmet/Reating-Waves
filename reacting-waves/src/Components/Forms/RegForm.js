import React, { Component } from 'react';


// Registration form containing input fields and buttons to create a user for the page.
//Cancel button to remove the form if you dont want to make an account.
class RegForm extends Component {
    
    state = {
        error: false,
        errorMsg: ''
    }
    
    render() {
        
        
        
        return (
            
            <div className="reg-form" style={{maxWidth: '50%', margin: '5rem auto'}}>
                <h3>Register</h3>
                <form onChange={this.props.onChange}>
                    <div className="reg-input">
                        <div>
                        <label htmlFor="email">E-mail</label>
                        <input 
                        type="text"
                        className="form-control"
                        name="regemail"
                        placeholder="Enter E-mail"
                        onChange={this.props.onChange}
                        value={this.props.regemail}
                        />
                    
                        { this.state.error && <div> <p>Sorry, Wrong username!</p> </div>}
                        
                        </div>
                        
                        <div>
                            <label htmlFor="password">Password</label>
                            <input 
                            type="password" 
                            className="form-control" 
                            name="regpassword"
                            placeholder="Password"
                            onChange={this.props.onChange}
                            value={this.props.regpassword}
                            />
                        </div>
                    </div>
                        <input onClick={this.props.register} type="submit" value="Register" required/>
                        <input onClick={this.props.cancel} type="button" value="Cancel" required/>

                </form>
            </div>
        );
    }
}
        
export default RegForm;