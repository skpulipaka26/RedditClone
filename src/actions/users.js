import axios from 'axios';

export const FETCHING_USERS = 'FETCHING_USERS';
export const SET_USERS = 'SET_USERS';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const RANDOM_COORDS = [
    {
        lat: 52.24,
        lng: -1.31
    }, {
        lat: 38.15,
        lng: -85.46
    }, {
        lat: 36.778259,
        lng: -119.417931
    }, {
        lat: 36.778259,
        lng: -119.417931
    }, {
        lat: 36.778259,
        lng: -119.417931
    }, {
        lat: 36.778259,
        lng: -119.417931
    }, {
        lat: 36.778259,
        lng: -119.417931
    }, {
        lat: 36.778259,
        lng: -119.417931
    }, {
        lat: 36.778259,
        lng: -119.417931
    }, {
        lat: 36.778259,
        lng: -119.417931
    }
];

export const fetchUsers = () => {
    return async (dispatch) => {
        dispatch({
            type: FETCHING_USERS
        });
        const res = await axios.get(`${BASE_URL}/users`);
        return res.data.map((user, index) => {
            return {
                ...user,
                address: {
                    ...user.address,
                    geo: RANDOM_COORDS[index]
                }
            };
        });
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
