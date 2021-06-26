import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import PersistentDrawerLeft from './templates/drawer';
import CapturePage from './pages/capturePage';

type PageProps = {
};

type PageState = {
};

class App extends React.PureComponent<PageProps, PageState> {
  render() {
    return (
      <HashRouter>
        <PersistentDrawerLeft />
        <div className="content-area">
          <div style={{ marginTop: '125px' }} />
          <Switch>
            <Route exact path="/" component={CapturePage} />
            <Route path="/capture" component={CapturePage} />
          </Switch>
          <div className="footer-area" />
        </div>
      </HashRouter>
    );
  }
}

export default App;
