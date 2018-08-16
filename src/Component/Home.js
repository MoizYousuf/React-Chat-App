import React, { Component } from "react";

import * as firebase from "firebase";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import TextField from "@material-ui/core/TextField";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      Uid: "",
      Name: "",
      usersDataBase: "",
      friendUsername: "",
      Message: ""
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
            .on("value", snap => {
              this.setState({
                usersDataBase: snap.val()
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

  getData = i => {
    let Snap = Object.values(this.state.usersDataBase);
    this.setState({
      friendUsername: Snap[i].Username
    });
    console.log(Snap[i].Username);
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
            {Snap.map((value, index) => {
              if (this.state.Name === Snap[index].Username) {
              } else {
                return (
                  <Button
                    // style={styles.buttons}
                    className="Buttons"
                    key={index}
                    onClick={() => {
                      this.getData(index);
                    }}
                  >
                    {Snap[index].Username}
                  </Button>
                );
              }
            })}
          </div>
          <div style={styles.displayChatBody}>
            <div style={styles.displayName}>{this.state.friendUsername}</div>
            <div style={styles.displayChat} />
            <br />
            <div>
              <TextField
                id="with-placeholder"
                onChange={e => this.setState({ Message: e.target.value })}
                label="Message"
                placeholder="Hi, `How are you`"
                margin="normal"
              />
              <Button color='primary'>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let styles = {
  nameStand: {
    width: "15%",
    background: "darkgray",
    height: "94vh"
  },
  parentHomeChat: {
    display: "flex"
  },
  displayChat: {
    width: "100%",
    background: "lightgray",
    height: "82vh",
    overflowY: "scroll"
  },
  displayChatBody: {
    width: "85%",
    display: "block"
  },
  displayName: {
    textAlign: "center",
    fontSize: "30px",
    color: "white",
    background: "blueviolet",
    fontFamily: " monospace"
  },
  buttons: {
    width: "100%",
    fontSize: "21px"
  }
};

export default Home;
