import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from 'firebase'
import { uids } from "./../firebase/firebase";
import {UserService} from './../../Services/service'
import RaisedButton from 'material-ui/RaisedButton';
import image from '../../Images/icon.png'
import DashBoard from '../Dashboard/dashboard'
import Chat from './..//Chats/chat'



export default class Home extends Component{
    ref = firebase.database().ref();
    constructor(){
        super()
    
        this.state={
            name:'',
            clickedUser:"",
            uid:''
        }
    }
    componentDidMount(){
        this.setState({user:localStorage.getItem("user")})
        UserService.UserValue()
        .then((userr)=>{
            const user =userr
            this.setState({name: user.name,uid:user.key})
        })
    }

    sendName(value){
        this.setState({clickedUser:value})
    }
    render(){
        return(
            <div>
            <AppBar
            title="Private Chat"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            iconElementRight={<div className="displayname"> <span className="diplayN"> {this.state.name} </span> 
            <RaisedButton label="LogOut" onClick={()=>{firebase.auth().signOut(); this.props.history.push('/')}} />
            </div>} 
          />
          <div className="div1"><DashBoard sendName={this.sendName.bind(this)}/></div>
          <div className="div2"><Chat clickedUser={this.state.clickedUser}/></div>
          </div>
        )
    }
}