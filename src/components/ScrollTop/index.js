import React from 'react';
import { withRouter } from 'react-router-dom';
export class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    console.log('prevProps', prevProps);
    console.log('props', this.props);
    console.log('this.props.history.action', this.props.history.action);
    // if (this.props.location.pathname !== prevProps.location.pathname) {
    //   window.scrollTo(0, 0);
    // }
    console.log(this.props.location.pathname !== '/FriendsGroupList');
    if (this.props.history.action === 'PUSH') {
      if (this.props.location.pathname !== '/') {
        window.scrollTo(0, 0);
      }
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
