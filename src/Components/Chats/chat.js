import React, { Component } from 'react';
import * as firebase from 'firebase'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Chat extends Component{
    ref = firebase.database().ref();
    constructor(){
        super()
        this.state={
         name:'',
         Useruid:'',
         message:'',
         chatArray:[]
        }
    }
    componentWillReceiveProps(newProps){
        this.setState({chatArray:[]})
        this.setState({name:newProps.clickedUser.name,Useruid:newProps.clickedUser.key}, function(){  
            console.log(newProps.clickedUser.key) 
            var comment = localStorage.getItem('user');
            this.ref.child("UserChat/"+comment+'/'+this.state.Useruid).on("value", (snapshot) => {
                let data = snapshot.val();
                if(data){
                    this.setState({chatArray: Object.values(data)})
                }else(null)
            })
                    
        })
    }
   
    sendToFirebase(ev) {
        ev.preventDefault();
        var comment = localStorage.getItem('user');
        this.ref.child("UserChat/"+ comment + '/' + this.state.Useruid).push({ message : this.state.message , name: this.state.name});
        this.ref.child("UserChat/"+ this.state.Useruid + '/' + comment).push({ message : this.state.message , name: this.state.name});
        this.setState({message:''})
      }
   
    render(){
        return(
                <div className="Border1">  {console.log(this.state.chatArray)}
                <h1 className="border2">&nbsp;&nbsp;&nbsp;{this.state.name}</h1>
        {this.state.chatArray?
             <div className="chatRoom">
                 <div className="chatRoom2">
             {this.state.chatArray.map((val,ind)=>{
                 if(this.state.name == val.name){
               return   <div  className="trstyle2" > <table>
                   <tr>
                       <td  key={ind}>{val.message }</td>
                       {/* <td className="sendTo">send to {val.name}</td> */}
                    </tr>
                    </table>
                    </div>
             
             }else{
                return   <div  className="trstyle" > <table>
                <tr> 
                    <td  key={ind}>{val.message }</td>
                 </tr>
                 <tr><td></td></tr>
                 </table></div>
             }
             })}</div>
             <div className="Align3">
             <form className="formclass" onSubmit={this.sendToFirebase.bind(this)}>
          <TextField
          hintText="Message"
          onChange={(ev)=>{this.setState({message: ev.target.value})}}
        value={this.state.message}
        className="width"
        />
        <input type="button" typ="submit" onClick={this.sendToFirebase.bind(this)} className="buttonClass"/>
         </form></div>
            </div> : <div></div>}
             
         </div>
            
        )
    }
}