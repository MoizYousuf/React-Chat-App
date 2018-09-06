import React, { Component } from "react";
import SendMessage from "./sendMessage";
import Spinner from "./spinner";

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const styles = {
      button: {
        width: "max-content",
        background: "wheat",
        borderBottomRightRadius: "100px",
        borderTopLeftRadius: "128px",
        border: "height",
        height: "10vh"
      },
      error: {
        backgroundColor: "#31B6F5",
        textAlign: "left",
        fontSize: "18px",
        fontFamily: "inherit",
        width: "fit-content",
        border: "1px solid #3f51b5",
        borderRadius: "20px",
        color: "white",
        padding: "6px"
      },
      error2: {
        backgroundColor: "red",
        textAlign: "left",
        fontSize: "18px",
        fontFamily: "inherit",
        width: "fit-content",
        border: "1px solid #3f51b5",
        borderRadius: "20px",
        color: "white",
        padding: "6px"
      },
      div: {
        padding: "25px",
        textAlign: "right"
      },
      div2: {
        padding: "25px",
        textAlign: "left"
      },
      span: {}
    };
    let {
      chatBody,
      selectedNameStyle,
      selectedName,
      displayChat,
      messageInputField,
      messages,
      Name,
      sendMessagetToDataBase
    } = this.props;
    return (
      <div style={chatBody}>
        <div style={selectedNameStyle}>
          <p style={styles.span}>{selectedName}</p>
        </div>
        <div style={displayChat}>
          {//
          messages && messages.length ? (
            messages.map((value, index) => {
              return (
                <div style={value.sendBy === Name ? styles.div : styles.div2}>
                  <span
                    key={index}
                    style={value.sendBy === Name ? styles.error : styles.error2}
                  >
                    {value.message}
                  </span>
                </div>
              );
            })
          ) : selectedName && messages && messages.length ? (
            <Spinner />
          ) : null
          //   }
          }
        </div>
        <div>
          <SendMessage
            messageInputField={messageInputField}
            sendMessagetToDataBase={e => sendMessagetToDataBase(e)}
          />
        </div>
      </div>
    );
  }
}
