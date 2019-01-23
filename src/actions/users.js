import axios from 'axios';

export const FETCHING_USERS = 'FETCHING_USERS';
export const SET_USERS = 'SET_USERS';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = () => {
    return async (dispatch) => {
        dispatch({
            type: FETCHING_USERS
        });
        const res = await axios.get(`${BASE_URL}/users`);
        return res.data;
    };
}

export const setUsers = (users) => {
    return dispatch => {
        return dispatch({
            type: SET_USERS,
            payload: users
        });
    };
};
