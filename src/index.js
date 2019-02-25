import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import VideoList from './containers/VideoList'
import VideoDetail from './containers/VideoDetail'

import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/video" render={VideoDetail} />
      <Route path="/" render={VideoList} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.unregister();
