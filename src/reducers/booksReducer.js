import {
    GET_ALL_BOOKS,
    CLEAR_CURRENT_BOOKS,
    GET_BOOKS_LOADING
} from "../actions/types";

const initialState = {
    books: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BOOKS_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_BOOKS:
            return {
                ...state,
                books: action.payload,
                loading: false
            };
        case CLEAR_CURRENT_BOOKS:
            return {
                ...state,
                books: []
            };

        default:
            return state;
    }
}
