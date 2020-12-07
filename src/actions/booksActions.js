import axios from "axios";

import {
    GET_ALL_BOOKS,
    CLEAR_CURRENT_BOOKS,
    GET_BOOKS_LOADING
} from "./types";

// Get list of all books
export const getAllBooks = () => dispatch => {
    dispatch(setBooksLoading());
    axios
        .get("api/books")
        .then(res =>
            dispatch({
                type: GET_ALL_BOOKS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_BOOKS,
                payload: {}
            })
        );
};

// Books loading
export const setBooksLoading = () => {
    return {
        type: GET_BOOKS_LOADING
    };
};

export const clearCurrentBooks = () => {
    return {
        type: CLEAR_CURRENT_BOOKS
    };
};
