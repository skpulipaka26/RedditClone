import { SET_USERS, FETCHING_USERS, SET_USER } from '../actions/users';

const initialState = {
    list: [],
    loading: false,
    selectedUser: null
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
        case SET_USER:
            return {
                ...state,
                selectedUser: action.payload
            };
        default:
            return { ...state };
    }
};