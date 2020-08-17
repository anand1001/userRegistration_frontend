import React, { Component } from 'react';
import axios from 'axios';
import history from './history';

class Modal extends Component {
  constructor(props){
    super(props); 

    this.state={
      redirectLogin:false
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const url = '/user_registration/user_registration.php';
    
    let reader = new FileReader();
    reader.readAsDataURL(this.props.file_name);

    reader.onload = (e) => {
      const  formData = {file: e.target.result, firstName:this.props.firstName, lastName:this.props.lastName, userName:this.props.username, password:this.props.password, fileName:this.props.file_name.name, fileType:this.props.file_name.type };
      axios.post(url,formData)
      .then(res => {
        let data = res.data;
        if(data !== 0){
          alert("Registration is successful!!");
          history.push("/login");
        }else{
          alert("Registration failed!!, please try again");
          document.getElementById("closeModal").click()
          window.location.reload(false);
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  render() {
    return (
      <div className='modal'>
        <div className='modal-content'>
          <div className="modal-title">{this.props.text}</div>
          <div>
            <div className="modal-label">
              <div>First Name: </div>
              <div className="modal-input-value">{this.props.firstName}</div>
            </div>
            <div className="modal-label">
              <div>Last Name: </div>
              <div className="modal-input-value">{this.props.lastName}</div>
            </div>
            <div className="modal-label">
              <div>Username: </div>
              <div className="modal-input-value">{this.props.username}</div>
            </div>
            <div className="modal-label">
              <div>Password: </div>
              <div className="modal-input-value">{this.props.password}</div>
            </div>
            <div className="modal-label">
              <label>NRIC file: </label>
              <div>
                <img width="150px" height="150px" alt={this.props.file_name.name} src={this.props.fileContent} />
              </div>
            </div>
          </div>
          <div>
            <button className="modal-btn float-left" id="closeModal" onClick={this.props.closeModal}>Edit</button>
            <button className="modal-btn float-right" style={{marginRight: 60}} onClick={(e) => this.onSubmit(e)}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
};
 
export default Modal;