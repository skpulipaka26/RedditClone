import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../actions/users';

import Post from '../components/Post';


class Posts extends Component {


    render() {
        let userDetails = null;
        if (this.props.users.selectedUser) {
            const { address, ...user } = this.props.users.selectedUser;
            userDetails = user;
        }
        return (
            <div className="container">
                <div className="row mt-3">
                    {this.props.postsAndUsers.map(post => {
                        const props = {
                            ...post,
                            searchedUser: userDetails,
                            history: this.props.history,
                            selectedUser: (user) => this.props.setSelectedUser(user)
                        };
                        return (
                            <div key={post.id} className="col-12 my-1">
                                <Post {...props} />
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
        ...userActions
    }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Posts);