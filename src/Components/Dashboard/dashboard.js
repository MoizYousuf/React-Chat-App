import React, { Component } from 'react';
import * as firebase from 'firebase'
import {UserService} from './../../Services/service'
import RaisedButton from 'material-ui/RaisedButton';
// import Chat from '../chats/chat'

export default class DashBoard extends Component{
    ref = firebase.database().ref();
    constructor(){
        super()
    
        this.state={
            name:'',
            allUsers:[],
            uid: '',
            user: ''
        }
    }
    componentDidMount(){
        this.setState({user:localStorage.getItem("user")})
        UserService.UserValue()
        .then((userr)=>{
            const user =userr
            this.setState({name: user.name, uid: user})
        firebase.database().ref('SignUp/').on('value',(snapshot)=>{
                let data = snapshot.val();
                if(data) { 
                    let dataArray= [];
                    // this.setState({ allUsers: data }, () => {
                    for(let key in data) {
                        // console.log(data[key])
                        let obj = data[key];
                        obj.key = key;
                        dataArray.push(obj)
                    }
                    this.setState({
                        allUsers:dataArray
                    })

                 }
              })
        })
    }
    sendToServer(name){
        this.props.sendName(name);
    }
    render(){
        return(
            
         <div className="Align5" id="allusers">
             <h1 className="h1">Friends</h1>
             <ul>
             {this.state.allUsers.map((user,index) => {
                 if(user.key===this.state.user){
                    return null;
                 } else{
                    return( <li key={index}  className="li"> <RaisedButton className="flex"
                    secondary={true}
                    label={user.name} 
                    onClick={this.sendToServer.bind(this,user)}
                    className="buttonWidth" 
                    /> <li><br/></li> </li>) 
                 }
               })}</ul>
         </div>
        )
    }
}