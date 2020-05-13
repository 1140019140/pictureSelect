import React, { Component } from "react";
import RouterList from "components/RoutesList";
import "@/assets/styles/index.less";

class App extends Component {
  componentDidMount() {
    // this.props.setShopId();
  }
  render() {
    return (
      <RouterList />
    );
  }
}

export default (App);
