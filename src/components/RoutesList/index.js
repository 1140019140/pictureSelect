import React from 'react';
import { Switch, Route, withRouter, BrowserRouter } from 'react-router-dom';
import NotLiveRoute from 'react-live-route';
import routers from 'route/index';
const keepAliveList = routers.filter(d => (d.keepAlive || d.nextPathKeep));
const LiveRoute = withRouter(NotLiveRoute);

class RoutesList extends React.Component {
 
  render() {
    let constRoute = routers.map((item, index) => {
      let props = {};
      if (!item.keepAlive && !item.nextPathKeep) {
        props = {
          ...props,
          // component: item.component
          component: (props) => {
            if (item.title) {
              document.title = item.title;
            }
            return <item.component {...props}/>;
          }
        };
      }
      return (
        <Route exact={true} key={index} path={item.path} name={item.name} {...props}/>
      );
    });
    let LiveRoutes = keepAliveList.map((item, index) => {
      let props = {};
      if (item.keepAlive) {
        props = {
          ...props,
          alwaysLive: true
        };
      } else if (item.nextPathKeep) {
        props = {
          ...props,
          livePath: item.nextPathKeep
        };
      }
      return (
        <LiveRoute
          {...props}
          exact={true}
          key={item.name}
          component={item.component}
          path={item.path}
          name={item.name}
          onHide={(location, match, history, livePath, alwaysLive) => {
            if (item.keepAlive || item.nextPathKeep === match.path) { 
              // this.props.addKeepAlive(item.path); 
            }
            typeof item.onHide === 'function' && item.onHide({ location, match, history, livePath, alwaysLive });
          }}
          onReappear={(location, match, history, livePath, alwaysLive) => {
            if (item.nextPathKeep) {
              // this.props.removeKeepAlive(item.path); 
            }
            typeof item.onReappear === 'function' && item.onReappear({ location, match, history, livePath, alwaysLive });
          }}
          forceUnmount={(location, match) => {
            return typeof item.forceUnmount === 'function' && item.forceUnmount(location, match);
          }}
        />
      );
    });

    return (
      <div>
        <BrowserRouter basename='/big-money-mobile-admin'>
          <Switch>
            {constRoute}
          </Switch>
          {LiveRoutes}
        </BrowserRouter>
      </div>
    );
  }
}

export default RoutesList;
