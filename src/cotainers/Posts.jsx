import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { from, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as postsActions from '../actions/posts';
import * as userActions from '../actions/users';

import Post from '../components/Post';

class Posts extends Component {

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
                    postsAndUsers: [...reqArr]
                });
            }
        );
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-3">
                    {this.state.postsAndUsers.map(post => {
                        return (
                            <div key={post.id} className="col-12 my-1">
                                <Post {...post} />
                            </div>
                        );
                    })}
                </div>
            </div>
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
)(Posts);