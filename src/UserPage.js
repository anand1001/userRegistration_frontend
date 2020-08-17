import React, { Component } from 'react';
import './App.css';
import history from './history';

export default class UserPage extends Component {
  constructor(props){
    super(props);

    this.state={
      mame:'',
      username:'',
      file_path:''
    }
  }

  componentDidMount(){
    this.props.location.state.forEach((item)=>{
      this.setState({name: item.name});
      this.setState({username: item.username});
      this.setState({file_path: item.file_path});
    });
  }

  render() {
    
    return (
      <div className='modal'>
        <div className='modal-content'>
          <div className="modal-title">User Profile</div>
          <div>
            <div className="modal-label">
              <div>Name: </div>
              <div className="modal-input-value">{this.state.name}</div>
            </div>
            <div className="modal-label">
              <div>Username: </div>
              <div className="modal-input-value">{this.state.username}</div>
            </div>
            <div className="modal-label">
              <label>NRIC file: </label>
              <div>
                <img width="150px" height="150px" alt={this.state.file_path} src={"/user_registration/uploaded_file/"+this.state.file_path} />
              </div>
            </div>
            <div id="rightbox">
                <button className="modal-btn" onClick={() => history.push('/login')}>Logout</button>
              </div>
          </div>
        </div>
      </div>
    )
  }
}
