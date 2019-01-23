import React from 'react';

import '../css/post.css'

const Post = ({ history, selectedUser, ...props }) => {
    const post = {
        ...props,
        body: props.body.split('\n')[0] || ''
    };

    return (
        <div>
            <div className="card hover" style={{ cursor: 'pointer' }}
                onClick={() => {
                    history.push(`/posts/${post.id}`,
                        JSON.parse(JSON.stringify({ ...post }))
                    );
                }}
            >
                <div className="card-body" >
                    <div className="d-flex align-items-center justify-content-between">
                        <h6 className="text-truncate m-0">
                            {post.title.toUpperCase()}
                        </h6>
                        <p className="card-subtitle text-muted mx-1 my-0" style={{
                            fontSize: '0.75rem'
                        }}>{post.date.toLocaleDateString()}</p>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            selectedUser(post.user);
                        }}
                        type="button" className="btn btn-link p-0"> {post.user.username}</button>
                    <p className="card-text d-flex mt-2">{post.body}...</p>
                </div>
            </div>

        </div>
    );
}

export default Post