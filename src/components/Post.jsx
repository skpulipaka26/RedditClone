import React from 'react';

import { Link } from 'react-router-dom';

import '../css/post.css'

const Post = (props) => {
    const post = {
        ...props,
        body: props.body.split('\n')[0] || ''
    };
    return (
        <div className="card" style={{ cursor: 'pointer' }}>
            <Link to={{ pathname: `/posts/${post.id}`, state: { ...props } }} className="post-details">
                <div className="card-body" >
                    <div className="d-flex align-items-center justify-content-between">
                        <h6 className="text-truncate">
                            {post.title.toUpperCase()}
                        </h6>
                        <p className="card-subtitle text-muted mx-1" style={{
                            fontSize: '0.75rem'
                        }}>{post.date.toLocaleDateString()}</p>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('user');
                        }}
                        type="button" className="btn btn-link p-0"> {post.user.username}</button>
                    <p className="card-text d-flex mt-2">{post.body}...</p>
                </div>
            </Link>
        </div>
    );
}

export default Post