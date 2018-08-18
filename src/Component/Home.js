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
      usersDataBase: "",
      message: {
      message: ''
      },
      selectedName: "",
      selectedNameUid: ""
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
  getSelectedName = i => {
    let Span = Object.values(this.state.usersDataBase);
    this.setState({
      selectedName: Span[i].Username,
      selectedNameUid: Span[i].Uid
    });
  };

  sendMessagetToDataBase = () => {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          firebase.database().ref(`chat/${user.uid}`).set(
            this.state.message
          )
        };
      }.bind(this)
    )
        
    console.log('run')
  };

  render() {
    let Snap = Object.values(this.state.usersDataBase);
    let left = "87%";
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
                    style={styles.button}
                    onClick={() => {
                      this.getSelectedName(index);
                    }}
                  >
                    {Snap[index].Username}
                  </Button>
                );
              }
            })}
          </div>
          <div style={styles.chatBody}>
            <div style={styles.selectedName}>{this.state.selectedName}</div>
            <div style={styles.displayChat} />
            <div>
              <input
                id="with-placeholder"
                style={styles.messageInputField}
                onChange={e => this.setState({ message: {message: e.target.value }})}
                label="Message"
                placeholder="Hi, How are you"
                margin="normal"
                type="textarea"
              />
              <Button onClick={this.sendMessagetToDataBase}>Send</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let styles = {
  nameStand: {
    width: "20%",
    background: "darkgray",
    height: "92vh"
  },
  parentHomeChat: {
    display: "flex"
  },
  button: {
    width: "100%"
  },
  chatBody: {
    width: "100%",
    height: "92vh",
    display: "block"
  },
  displayChat: {
    background: "gray",
    width: "10  0%",
    height: "80vh",
    overflowY: "scroll"
  },
  selectedName: {
    width: "100%",
    textAlign: "center",
    fontSize: "25px",
    background: "cornflowerblue",
    fontFamily: "monospace"
  },
  messageInputField: {
    textAlign: "center",
    width: "50%",
    height: "10vh",
    fontSize: "25px"
  }
};

export default Home;
