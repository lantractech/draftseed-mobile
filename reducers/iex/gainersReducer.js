import {
    IEX_GAINERS_REQUEST,
    IEX_GAINERS_SUCCESS,
    IEX_GAINERS_FAILURE,
    IEX_GAINERS_RESET
} from 'actions/actionTypes'

// reducer with initial state
const initialState = {
    fetching: false,
    error: null,
    data: []
};

export function iexGainers(state = initialState, action) {
    switch (action.type) {
        case IEX_GAINERS_REQUEST:
            return { ...state, fetching: true, error: null };
        case IEX_GAINERS_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.data };
        case IEX_GAINERS_FAILURE:
            return { ...state, fetching: false, error: action.error, data: [] };
        case IEX_GAINERS_RESET:
            return { ...state, error: null, data: [] };
        default:
            return state;
    }
}