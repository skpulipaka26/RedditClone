import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import posts from './reducers/posts';
import users from './reducers/users';
import comments from './reducers/comments';

const initialState = {
    users: [],
    posts: [],
    comments: []
};
const enhancers = [];
const middleware = [thunk];


if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

export const store = createStore(
    combineReducers({ posts, users, comments }),
    initialState,
    composedEnhancers
);

