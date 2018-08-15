import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom'
import image from '../../Images/icon.png'
import '../../App.css'
import * as firebase from 'firebase';

export default class Login extends Component {
    ref = firebase.database().ref();
    constructor(){
        super()
        this.state={
            email:'',
            password:''
        }
    }
    checkData(){
        console.log(this.state);
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then((user)=>{ 
          localStorage.setItem('user', user.uid); this.props.history.push('/Home') })
        .catch((ev)=>{alert(ev.message)})
    }
render(){
    return(
        <div>
             <div className="Align1">
        <img src={image}  className="icon" alt="Pvt Chat"/>
        <div className="login-border1">
          <TextField
      hintText="contactme797@gmail.com"
      floatingLabelText="Email Address"
      onChange={(ev)=>{this.setState({email: ev.target.value})}}
    /> <br />
    <TextField
      hintText="hello1234"
      floatingLabelText="Password"
      type="password"
      onChange={(ev)=>{this.setState({password: ev.target.value})}}
    /><br />
    <div className="newAcc">Create a New Account:<Link to='/Signup'><span className="newSign"> Signup</span> </Link></div>
    <RaisedButton
      label="LogIn"
      labelPosition="before"
      primary={true}
      className="button"
      onClick={this.checkData.bind(this)}
      align="center"
      type="submit"
    />
    
        </div>
      </div>
        </div>
        
    )
}
}