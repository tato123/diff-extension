import React from "react";
import Widget from "components/Widget";
import Launcher from "components/Launcher";

export default class App extends React.Component {
  render() {
    return (
      <Widget>
        <Launcher />
      </Widget>
    );
  }
}
