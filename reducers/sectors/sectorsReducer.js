import {
    SECTORS_REQUEST,
    SECTORS_SUCCESS,
    SECTORS_FAILURE,
    SECTORS_RESET
} from 'actions/actionTypes'

// reducer with initial state
const initialState = {
    fetching: false,
    error: null,
    data: []
};

export function sectors(state = initialState, action) {
    switch (action.type) {
        case SECTORS_REQUEST:
            return { ...state, fetching: true, error: null };
        case SECTORS_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.data };
        case SECTORS_FAILURE:
            return { ...state, fetching: false, error: action.error, data: [] };
        case SECTORS_RESET:
            return { ...state, error: null, data: [] };
        default:
            return state;
    }
}