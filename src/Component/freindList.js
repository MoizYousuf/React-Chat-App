import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Spinner from "./spinner";

export default class FriendLists extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    let {
      totalUsers,
      nameStand,
      buttonStyle,
      Name,
      getSelectedName
    } = this.props;
    let Snap = totalUsers ? Object.values(totalUsers) : [];
    return (
      <div style={nameStand}>
        <h1 align="center">Friend Lists</h1>
        {Snap && Snap.length ? (
          Snap.map((value, index) => {
            if (Name !== value.Username) {
              return (
                <div>
                  <Button
                    key={index}
                    style={buttonStyle}
                    onClick={e => {
                      getSelectedName(index);
                    }}
                  >
                    {value.Username}
                  </Button>
                </div>
              );
            }
          })
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}
