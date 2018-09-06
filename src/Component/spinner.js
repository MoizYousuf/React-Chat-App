import React, { Component } from "react";

export default class Spinner extends Component {


  render() {
        let styles = {
            spinner: {
            width: "5%",
            marginTop: '30%'
            }
        };
    return (
      <div id="spinner"  align="middle">
        <img src="spinner.gif" style={styles.spinner} alt="Spinner" align="middle" />
      </div>
    );
  }
}
