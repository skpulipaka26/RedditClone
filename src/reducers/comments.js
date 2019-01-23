import { SET_COMMENTS } from "../actions/comments";

const initialState = {
    list: [],
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_COMMENTS:
            return {
                ...state,
                loading: false,
                list: [...action.payload]
            };
        default:
            return { ...state };
    }
};