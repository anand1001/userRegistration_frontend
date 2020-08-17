import React from 'react';
import './App.css';
import axios from 'axios';
import history from './history';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state ={
      username: '',
      password: '',
      redirectView: false
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  
  onChange(e) {
    this.setState({[e.target.name]:e.target.value}) 
  }

  onFormSubmit(e){
    e.preventDefault();
    
    if(this.state.username.length === 0 && this.state.password.length === 0){
      alert("Please enter username and password");
      return;
    }
    else if(this.state.username.length === 0){
      alert("username is empty");
      return;
    }
    else if(this.state.password.length === 0){
      alert("password is empty");
      return;
    }
    //let self = this;
    let data = this.state;
    const url = '/user_registration/user_login.php';
    
    axios.post(url,data)
      .then(res => {
        let data = res.data;
        if(data.length >= 1){
          //console.log(data);
          //self.setState({redirectView:true});
          //let username = self.state.username;
          //history.push('/user_profile');
          history.push('/user_profile', data );
          
        }else{
          //self.setState({redirectView:false});
          alert("Username or password does not match, please try again");
          window.location.reload(false);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="container">
          <div className="register-form" >
            <div className="title">User Login Form</div>
            <div className="form">
              <div>
                <label>
                  Username
                  <input
                    type="text"
                    value={this.state.username}
                    name="username"
                    onChange={this.onChange}  />
                </label>
              </div>

              <div>
                <label>
                  Password
                  <input
                    type="password"
                    value={this.state.password}
                    name="password"
                    onChange={this.onChange}  />
                </label>
              </div>
              <div>
                <button className="sb-btn float-left" type="button" onClick={this.onFormSubmit}>Login</button>            
                <button className="sb-btn float-right" type="button" onClick={() => history.push('/')}>Registration</button> 
              </div>
            </div>
          </div>
        </div>
      </form>
   )
  }
}
export default Login;