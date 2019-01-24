import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { from, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import * as postsActions from './actions/posts';
import * as userActions from './actions/users';

import Posts from './cotainers/Posts';
import Details from './cotainers/Details';

import './App.css';
import Layout from './components/Layout';

class App extends Component {

  posts$;
  users$;

  constructor(props) {
    super(props);
    this.state = {
      postsAndUsers: []
    };
  }

  componentDidMount() {
    this.posts$ = from(this.props.fetchPosts()).pipe(
      tap(this.props.setPosts)
    );
    this.users$ = from(this.props.fetchUsers()).pipe(
      tap(this.props.setUsers)
    );
    forkJoin(this.posts$, this.users$).subscribe(
      res => {
        const posts = res[0];
        const users = res[1];
        const usersObj = {};
        users.forEach(({ id, ...user }) => usersObj[id] = user);
        const reqArr = posts.map(({ userId, ...post }) => {
          return {
            ...post,
            user: {
              ...usersObj[userId],
              id: userId
            }
          };
        });
        this.setState({
          ...this.state,
          postsAndUsers: [...reqArr]
        });
      }
    );
  }


  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/posts" render={(props) => <Posts {...props} postsAndUsers={this.state.postsAndUsers} />} />
            <Route exact path="/posts/:id" component={Details} />
            <Redirect exact to="/posts" />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...postsActions,
    ...userActions
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
