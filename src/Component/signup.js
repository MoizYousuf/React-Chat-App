import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import * as firebase from "firebase";
import Button from "@material-ui/core/Button";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      Username: "",
      Email: "",
      Uid: "",
      Password: ""
    };
  }

  firebaseSignup = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let uid = user.uid;
        this.setState({
          Uid: uid
        });
      }
    });

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.Email, this.state.Password)
      .then(success => {
        this.setState({
          Uid: success.user.uid
        });
        firebase
          .database()
          .ref(`user/${success.user.uid}`)
          .set(this.state)
          .then(res => {
            this.props.history.push("/");
          });
        var user = firebase.auth().currentUser;

        user
          .updateProfile({
            displayName: this.state.Username,
          })
          .then(function() {
            // Update successful.
          })
          .catch(function(error) {
            // An error happened.
          });
      })

      .catch(function(error) {});
  };

  render() {
    return (
      <div style={styles.body}>
        {/* <button onClick={() => this.props.history.push('/')}>{}</button> */}
        <Card style={styles.card}>
          <h1>Sign up</h1>
          <TextField
            id="with-placeholder"
            onChange={e => this.setState({ Username: e.target.value })}
            label="Username"
            placeholder="MoizYousuf"
            margin="normal"
          />
          <br />
          <TextField
            id="with-placeholder"
            onChange={e => this.setState({ Email: e.target.value })}
            label="Email Address"
            placeholder="moizyousuf24@gmail.com"
            margin="normal"
          />
          <br />
          <TextField
            id="with-placeholder"
            onChange={e => this.setState({ Password: e.target.value })}
            label="Password"
            placeholder="hello123"
            margin="normal"
            type="password"
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={this.firebaseSignup}
          >
            Submit
          </Button>
          <p>
            already have an account :{" "}
            <button onClick={() => this.props.history.push("/")}>Login</button>
          </p>
        </Card>
      </div>
    );
  }
}
const styles = {
  body:{
    marginTop: "20%"
  },
  card: {
    minWidth: "20%",
    width: "32%",
    margin: "0 auto",
    textAlign: "center"
  }
};
export default Signup;
