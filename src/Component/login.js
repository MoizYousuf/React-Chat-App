import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import * as firebase from "firebase";
import Button from "@material-ui/core/Button";

class login extends Component {
  constructor() {
    super();
    this.state = {
      Email: "",
      Password: ""
    };
  }

  firebaseSignin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.Email, this.state.Password)
      .then((success) =>{
        this.props.history.push("/home")
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  };
  render() {
    return (
      <div>
        <div>
          <Card style={styles.card}>
            <h1>Log in</h1>
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
              onClick={this.firebaseSignin}
            >
              Submit
            </Button>
            <p>
              sign up for an account :{" "}
              <button onClick={() => this.props.history.push("/signup")}>
                Signup
              </button>
            </p>
          </Card>
        </div>
      </div>
    );
  }
}
const styles = {
  card: {
    minWidth: 100,
    width: 600,
    margin: "0 auto",
    textAlign: "center"
  }
};
export default login;
