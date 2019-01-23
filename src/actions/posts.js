import axios from 'axios';

export const FETCHING_POSTS = 'FETCHING_POSTS';
export const SET_POSTS = 'SET_POSTS';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = () => {
    return async (dispatch) => {

        dispatch({
            type: FETCHING_POSTS
        });

        // generate 100 random dates and sort in ascending order
        const randomDates = Array.from(Array(100), () => randomDate(new Date(2016, 0, 1)))
            .sort((a, b) => a - b);

        const res = await axios.get(`${BASE_URL}/posts`);
        return res.data.map((post, index) => {
            return {
                ...post,
                date: randomDates[index] || new Date()
            };
        });

    };
}

export const setPosts = (posts) => {
    return dispatch => {
        return dispatch({
            type: SET_POSTS,
            payload: posts
        });
    }
}

const randomDate = (start, end = new Date()) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

