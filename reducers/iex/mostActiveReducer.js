import {
    IEX_MOST_ACTIVE_REQUEST,
    IEX_MOST_ACTIVE_SUCCESS,
    IEX_MOST_ACTIVE_FAILURE,
    IEX_MOST_ACTIVE_RESET
} from 'actions/actionTypes'

// reducer with initial state
const initialState = {
    fetching: false,
    error: null,
    data: []
};

export function iexMostActive(state = initialState, action) {
    switch (action.type) {
        case IEX_MOST_ACTIVE_REQUEST:
            return { ...state, fetching: true, error: null };
        case IEX_MOST_ACTIVE_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.data };
        case IEX_MOST_ACTIVE_FAILURE:
            return { ...state, fetching: false, error: action.error, data: [] };
        case IEX_MOST_ACTIVE_RESET:
            return { ...state, error: null, data: [] };
        default:
            return state;
    }
}