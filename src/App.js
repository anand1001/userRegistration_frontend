import React, { Component } from 'react';
import Modal from './modal';
import axios from 'axios';
import './App.css';
import history from './history';

class App extends Component {
  constructor(props){
    super(props); 
    
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      file_name: '',
      fileContent: '',
      isUserNameAvailable: true,
      visibility: 'hidden',
      valid: {
        firstName: true,
        lastName: true,
        username: true,
        password: true,
        file_name: true
      },
      touched: {
        firstName: false,
        lastName: false,
        username: false,
        password: false,
        file_name: false
      },
      modalisOpen: false
    };

    this.rexExpMap = {
      firstName: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      lastName: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      username: /^[a-z\d._]+$/,
      password: /^.{8,}$/,
      file_name: /[A-Za-z0-9_@./#&+-]*$/,
    }
  
    this.handleChange = this.handleChange.bind(this);
    this.checkData = this.checkData.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.checkOnSubmit = this.checkOnSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.checkUserNameAvailable = this.checkUserNameAvailable.bind(this);
  }
  
  uploadImage = (e, file_name) => {
    if(e.target.files[0]){
      this.setState({file_name: e.target.files[0]});
      this.setState({fileContent: URL.createObjectURL(e.target.files[0])});
      this.setState({visibility:"show"});
      this.checkData(this.rexExpMap[file_name], this.state[file_name], this.state.valid[file_name], file_name)
    }else{
      this.setState({file_name: ''});
      this.setState({fileContent: ''});
      this.setState({visibility:"hidden"});
    }
  }

  handleChange = (e, name) => {
    if(name !== "file_name"){
      this.setState({[e.target.name]: e.target.value}, () => {
        this.checkData(this.rexExpMap[name], this.state[name], this.state.valid[name], name)
      });
    }
  }

  checkData(regExp, stateName, stateValid, name){
    this.setState({
      touched: { ...this.state.touched, [name]: true }
    });
   if(regExp.test(stateName)) {
      this.setState({
        valid: { ...this.state.valid, [name]: true }
      });
    } else {
      this.setState({
        valid: { ...this.state.valid, [name]: false }
      });
    }
  }

  validate(firstName, lastName, username, password) {  
    return {
      firstName: firstName.length === 0,
      lastName: lastName.length === 0,
      username: username.length === 0,
      password: password.length === 0
    };
  }

  requiredStyle(name) {
    const show = (this.state[name] === "" || !this.state.valid[name]) && this.state.touched[name];
    return {display: show ? 'block' : 'none'}
  }

  errorMessages(name) {
    const requiredStr = 'This field is required.';
    const invalidStr = 'Enter valid '+ name +'.';
    return !this.state.valid[name] && this.state[name] !== "" ? invalidStr : requiredStr
  }

  async checkUserNameAvailable(){
    //check if username is available 
    const url = '/user_registration/user_available.php';
    let data = this.state.username;
    var self = this;

    await axios.get(url, {
      params: {
        username: data
      }
    })
    .then(function (response) {
      if(response.data === 0){
        alert("username is not available, please try again");
        self.setState({isUserNameAvailable: false});
        self.setState({username: ''});
      }else{
        self.setState({isUserNameAvailable: true});
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  async checkOnSubmit() {
    const {firstName, lastName, username, password, file_name } = this.state;    
    const formFilled = !(firstName === '' || lastName === '' || username === '' || password === '' || file_name === '');
    const formInvalid = Object.keys(this.state.valid).some(x => !this.state.valid[x]);
    const formHasErrors = !formFilled || formInvalid;
    
    //check userName availability
    await this.checkUserNameAvailable();
    
    if (!formHasErrors && this.state.isUserNameAvailable && this.state.fileContent !== '') {
      this.toggleModal();
    }
    this.setState({
      touched: {
        firstName: true,
        lastName: true,
        username: true,
        password: true,
        file_name: true
      },
    });
  }

  toggleModal(){
    this.setState(prevState => ({
      modalisOpen: !prevState.modalisOpen
    }));
  }
  
  render() {
    const errors = this.validate(this.state.firstName, this.state.lastName, this.state.username, this.state.password);
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    }
    const helpMessage = (name) =>{
      return {display: shouldMarkError(name) ? 'none' : 'block'}
    }
    
    return (
      <div className="container">
        <div className="register-form" >
          <div className="title">User Registration Form</div>
          <div className="form">
            <div>
              <label>
                First Name
                <input
                  type="text"
                  value={this.state.firstName}
                  name="firstName" id="firstName"
                  className={shouldMarkError("firstName") ? "error" : ""}
                  onChange={(e) => this.handleChange(e, "firstName")} />
              </label>
              <span className="required-field" style={this.requiredStyle('firstName')}>{this.errorMessages('firstName')}</span>
            </div>
            <div>
              <label>
                Last Name
                <input
                  type="text" 
                  value={this.state.lastName} 
                  name="lastName" id="lastName"
                  className={shouldMarkError("lastName") ? "error" : ""}
                  onChange={(e) => this.handleChange(e, "lastName")} />
              </label>
              <span className="required-field" style={this.requiredStyle('lastName')}>{this.errorMessages('lastName')}</span>
            </div>

            <div>
              <label>
                Username
                <input
                  type="text"
                  value={this.state.username}
                  name="username"
                  className={shouldMarkError("username") ? "error" : ""}
                  onChange={(e) => this.handleChange(e, "username")} />
              </label>
              <span className="required-field" style={this.requiredStyle('username')}>{this.errorMessages('username')}</span>
            </div>

            <div>
              <label>
                Password
                <input
                  type="password"
                  value={this.state.password}
                  name="password"
                  className={shouldMarkError("password") ? "error" : ""}
                  onChange={(e) => this.handleChange(e, "password")} />
              </label>
              <span className="note" style={helpMessage('password')}>At least 8 characters</span>
              <span className="required-field" style={this.requiredStyle('password')}>{this.errorMessages('password')}</span>
            </div>

            <div>
              <label>
                NIRC File Upload
                <input type="file" name="file_name" onChange={(e) => this.uploadImage(e, "file_name")} />
              </label>
              <span className="required-field" style={this.requiredStyle('file_name')}>{this.errorMessages('file_name')}</span>
            </div>
            <div className={this.state.visibility}>
              <img width="150px" height="150px" alt={this.state.file_name.name} src={this.state.fileContent} />
            </div>
            <div>
            <label>
              <button className="sb-btn float-left" type="button" onClick={this.checkOnSubmit}>Preview</button>            
              <button className="sb-btn float-right" type="button" onClick={() => history.push('/login')}>Login</button> 
            </label>
            </div>           
          </div>
        </div>
        {this.state.modalisOpen? 
          <Modal
            text='Your Data'
            {...this.state}
            closeModal={this.toggleModal}
          />
          : null
        }
      </div>
    );
  } 
}
export default App;