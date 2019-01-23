import { SET_USERS, FETCHING_USERS } from '../actions/users';

const initialState = {
    list: [],
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_USERS: 
            return {
                ...state,
                loading: true
            };
        case SET_USERS:
            return {
                ...state,
                list: [...action.payload],
                loading: false
            };
        default:
            return { ...state };
    }
};