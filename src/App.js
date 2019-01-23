import React, { Component } from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Posts from './cotainers/Posts';

import './App.css';
import Layout from './components/Layout';
import Details from './cotainers/Details';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/posts/:id" component={Details}/>
            <Redirect exact to="/posts" />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
