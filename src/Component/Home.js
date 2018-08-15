import React, { Component } from "react";

import * as firebase from "firebase";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      Uid: "",
      Name: "",
      usersDataBase: ""
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          this.setState({
            Uid: user.uid,
            Name: user.displayName
          });
          firebase
            .database()
            .ref("user")
            .on("value", (snap) => {
              this.setState({
                usersDataBase: snap.val(),
              });
              console.log(this.state.usersDataBase);
            });
          console.log(this.state);
        } else {
          this.props.history.push("/");
        }
      }.bind(this)
    );
  }

  Logout = () => {
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          // Sign-out successful.
        },
        function(error) {
          // An error happened.
        }
      );
  };
  render() {
    let Snap = Object.values(this.state.usersDataBase);
    let left = "90%";
    const style = {
      left: left
    };
    return (
      <div>
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit">
                Chats
              </Typography>
              <Button style={style} color="inherit" onClick={this.Logout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </div>
        <div className="parentHomeChat" style={styles.parentHomeChat}>
          <div style={styles.nameStand}>
            {
              Snap.map((value, index)=>{
                if(this.state.Name === Snap[index].Username){

                }else{
               return <Button>{ Snap[index].Username }</Button>
              }
              })
            }
          </div>
        </div>
      </div>
    );
  }
}


let styles = {
  nameStand:{
    width: "20%",
    background: "darkgray",
    height: "92vh",
  },
  parentHomeChat:{
    display: "flex",
  }
}

export default Home;
