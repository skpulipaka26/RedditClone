import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as commentsActions from '../actions/comments';

import User from '../components/User';
import GMap from '../components/Map';

class Details extends Component {

    componentDidMount() {
        const postId = this.props.match.params.id;
        this.props.fetchComments(postId);
    }

    render() {
        const post = this.props.location.state;
        const comments = this.props.comments.list;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-8">

                        <div className="card my-2">
                            <div className="card-header text-white bg-dark">
                                <button type="button" className="close" aria-label="Close"
                                    onClick={() => this.props.history.goBack()}
                                >
                                    <span aria-hidden="true" style={{ color: 'white' }}>&times;</span>
                                </button>
                                <h5 className="card-title m-0 p-0">{post.title.toUpperCase()}</h5>
                            </div>
                            <div className="card-body">

                                {post.body}

                                <hr />

                                {comments ?
                                    (<div>
                                        {comments.map(comment => {
                                            return (
                                                <div className="card" key={comment.id}>
                                                    <div className="card-body">
                                                        <p className="m-0 font-italic font-weight-bold"
                                                            style={{ fontSize: '0.85rem' }}>{comment.name}</p>
                                                        <p className="m-0 font-italic text-muted"
                                                            style={{ fontSize: '0.85rem' }}>{comment.email}</p>
                                                        {comment.body}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card my-2">
                            <div className="card-header bg-dark">
                                <h6 className="text-white p-0 m-0">Posted by</h6>
                            </div>
                            <div className="card-body">
                                <User {...post.user} />
                                <GMap {...post.user.address.geo} />
                            </div>
                        </div>
                    </div>

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
        ...commentsActions,
    }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Details);