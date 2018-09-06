import React, { Component } from "react";
import * as firebase from "firebase";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import FriendLists from "./freindList";
import Chat from "./chat";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      Uid: "",
      Name: "",
      usersDataBase: "",
      message: [],
      selectedName: "",
      selectedNameUid: "",
      selectedNameMessages: ""
    };
  }

  componentDidMount() {
    console.log("componentDidMount");

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
            });
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
    let Span = this.state.usersDataBase
      ? Object.values(this.state.usersDataBase)
      : [];
    if (Span[i].Username !== this.state.selectedName) {
      this.setState({ messages: [] });
    }
    this.setState(
      {
        selectedName: Span[i].Username,
        selectedNameUid: Span[i].Uid
      },
      () => {
        this.displayChat();
      }
    );
    // if (this.state.selectedName == "") {
    //   this.setState({
    //     selectedName: Span[i].Username,
    //     selectedNameUid: Span[i].Uid
    //   });
    // }
    // if (this.state.selectedName !== "") {
    //   () => this.displayChat();
    // }
  };

  displayChat = () => {
    console.log("display Chat");
    let { selectedName, Uid, selectedNameUid } = this.state;
    // if( this.state.message !== "" || this.state.message !== []){
    // this.state.message = []
    // }
    if (selectedName !== "") {
      firebase
        .database()
        .ref(`chat/${selectedNameUid}/${Uid}`)
        .on("value", snapshot => {
          if (snapshot.val()) {
            let messages = Object.values(snapshot.val());
            this.setState({
              messages: messages
            });
          }
        });
    } else {
      console.log(this.state);
    }
  };

  sendMessagetToDataBase = message => {
    console.log(message);
  

this.setState({
  message: message,
}
)

firebase.auth().onAuthStateChanged((user) => {
  if(user){
        if(message) {
          firebase.database().ref(`chat/${this.state.Uid}/${this.state.selectedNameUid}`).push({
            sendBy: this.state.Name,
            message: message,
          }).then(() => {
            firebase.database().ref(`chat/${this.state.selectedNameUid}/${this.state.Uid}`).push({
              sendBy: this.state.Name,
              message: message,
            }).then(() => {
              this.setState({
                message: '',
              })
              message ='';
            })
          })
        }
        }
      }
      )
  };

  render() {
    const {
      usersDataBase,
      Name,
      selectedName,
      selectedNameUid,
      Uid,
      messages,
      selectedNameMessages
    } = this.state;
    const {
      nameStand,
      button,
      chatBody,
      selectedNameStyle,
      displayChat,
      messageInputField
    } = styles;
    let left = "87%";
    const style = {
      left: left
    };
    return (
      <div>
        <div>
          <AppBar position="static" style={styles.AppBar}>
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
          <FriendLists
            totalUsers={usersDataBase}
            nameStand={nameStand}
            buttonStyle={button}
            Name={Name}
            getSelectedName={index => this.getSelectedName(index)}
          />
          <Chat
            chatBody={chatBody}
            selectedNameStyle={selectedNameStyle}
            displayChat={displayChat}
            messageInputField={messageInputField}
            selectedName={selectedName}
            selectedNameUid={selectedNameUid}
            Uid={Uid}
            Name={Name}
            messages={messages}
            selectedNameMessages={selectedNameMessages}
            sendMessagetToDataBase={message =>
              this.sendMessagetToDataBase(message)
            }
          />
        </div>
      </div>
    );
  }
}

let styles = {
  AppBar: {
    width: "100%"
  },
  nameStand: {
    maxWidth: "25%",
    minWidth: "25%",
    height: "93vh",
    border: "1px solid white",
    borderRightColor: "gray",
    overflowY: "auto"
  },
  parentHomeChat: {
    display: "flex",
    width: "100%",
    height: "100%"
  },
  button: {
    width: "100%",
    height: "3vh",
    background: "#3f51b5",
    marginTop: "3px",
    color: "white"
  },
  chatBody: {
    width: "100%",
    height: "92vh",
    display: "block"
  },
  displayChat: {
    border: "1px solid white",
    borderBottomColor: "gray",
    // width: "100%",
    height: "91%",
    overflowY: "auto",
    background: "#3f51b5"
  },
  selectedNameStyle: {
    // width: "100%",
    height: "3%",
    textAlign: "left",
    fontSize: "25px",
    fontFamily: "monospace",
    marginLeft: "30px",
    borderBottom: "1px solid gray"
  },
  messageInputField: {
    width: "90%",
    height: "3vh",
    marginLeft: "2%",
    marginTop: "1%",
    fontSize: "15px",
    border: "1px solid white"
  }
};

export default Home;
