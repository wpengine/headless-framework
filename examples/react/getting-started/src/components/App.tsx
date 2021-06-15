import 'normalize.css/normalize.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'scss/main.scss';
import { Category, Home, Page, Post, Preview } from '../pages';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={`/preview`}>
            <Preview />
          </Route>
          <Route path={`/posts/:postSlug`}>
            <Post />
          </Route>
          <Route path={`/category/:categorySlug`}>
            <Category />
          </Route>
          <Route path={`/:pageSlug`}>
            <Page />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;