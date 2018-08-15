import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from 'firebase';
// import Home from '../Home/home';
import image from '../../Images/icon.png'
import '../../App.css'

export default class SignUp extends Component {
    ref = firebase.database().ref();
    constructor(){
        super()
        this.state={
            name : '',
            email : '',
            password : ''
        }
    }
    sendData(){
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(()=>{
            firebase.auth().currentUser.updateProfile({
                displayName:this.state.name
            })
            let uids = firebase.auth().currentUser.uid;
            firebase.database().ref('SignUp/'+uids).set({
                email : this.state.email,
                name : this.state.name,
                password : this.state.password,
            })
            alert("signup Done")
            this.setState({name:'',email:'',password:''})
          
            this.props.history.push("/")
        })
        .catch(ev=>{alert(ev.message)})
        
    }
render(){
    return(
        <div className="Align1">
            <img src={image}  className="icon" alt="Pvt Chat"/>
              <div className="login-border1">
          <TextField
      hintText="Arbaz Yousuf"
      floatingLabelText="Full Name"
      onChange={(ev)=>{this.setState({name : ev.target.value})}}
    /> <br />
    <TextField
      hintText="contactme797@gmail.com"
      floatingLabelText="Email Address"
      onChange={(ev)=>{this.setState({email : ev.target.value})}}
   /><br />
    <TextField
      hintText="hello1234"
      floatingLabelText="Password"
      type="password"
      onChange={(ev)=>{this.setState({password : ev.target.value})}}
    /><br /><br/>
    <RaisedButton
      label="Sign Up"
      labelPosition="before"
      primary={true}
      className="button"
      onClick={this.sendData.bind(this)}
    />
        </div>
        </div>
        
    )
}
}