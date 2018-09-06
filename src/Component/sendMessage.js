import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export default class SendMessage extends Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
  }
  sendMessage = () => {
    const { sendMessagetToDataBase } = this.props;

    if (
      this.state.message === null ||
      this.state.message === undefined ||
      this.state.message === ""
    ) {
      alert("please fill message");
    } else {
      sendMessagetToDataBase(this.state.message);
      this.setState({
        message: []
      })
    }
  };
  render() {
    const { messageInputField } = this.props;
    return (
      <div>
        <input
          value={this.state.message}
          style={messageInputField}
          onChange={e => this.setState({ message: e.target.value })}
          label="Message"
          placeholder="Type a message"
          margin="normal"
          type="textarea"
        />
        <Button style={styles.button} onClick={e => this.sendMessage(e)}>
          Send
        </Button>
      </div>
    );
  }
}
const styles = {
  button: {
    color: "#365899"
  }
};
