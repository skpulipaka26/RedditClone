import axios from 'axios';

export const SET_COMMENTS = 'SET_COMMENTS';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchComments = (postId) => {
    return async dispatch => {
        dispatch({
            type: SET_COMMENTS,
            payload: []
        });
        const res = await axios.get(`${BASE_URL}/comments?postId=${postId}`);
        dispatch({
            type: SET_COMMENTS,
            payload: res.data
        });
        return res.data;
    }
}
