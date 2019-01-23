import { SET_POSTS, FETCHING_POSTS } from '../actions/posts';

const initialState = {
    list: [],
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_POSTS:
            return {
                ...state,
                loading: true
            };
        case SET_POSTS:
            return {
                ...state,
                list: [...action.payload],
                loading: false
            };
        default:
            return { ...state };
    }
};