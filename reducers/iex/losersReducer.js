import {
    IEX_LOSERS_REQUEST,
    IEX_LOSERS_SUCCESS,
    IEX_LOSERS_FAILURE,
    IEX_LOSERS_RESET
} from 'actions/actionTypes'

// reducer with initial state
const initialState = {
    fetching: false,
    error: null,
    data: []
};

export function iexLosers(state = initialState, action) {
    switch (action.type) {
        case IEX_LOSERS_REQUEST:
            return { ...state, fetching: true, error: null };
        case IEX_LOSERS_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.data };
        case IEX_LOSERS_FAILURE:
            return { ...state, fetching: false, error: action.error, data: [] };
        case IEX_LOSERS_RESET:
            return { ...state, error: null, data: [] };
        default:
            return state;
    }
}