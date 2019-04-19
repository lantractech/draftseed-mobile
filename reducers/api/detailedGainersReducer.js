import {
    API_DETAILED_GAINERS_REQUEST,
    API_DETAILED_GAINERS_SUCCESS,
    API_DETAILED_GAINERS_FAILURE,
    API_DETAILED_GAINERS_RESET
} from 'actions/actionTypes'

// reducer with initial state
const initialState = {
    fetching: false,
    error: null,
    data: []
};

export function detailedGainers(state = initialState, action) {
    switch (action.type) {
        case API_DETAILED_GAINERS_REQUEST:
            return { ...state, fetching: true, error: null };
        case API_DETAILED_GAINERS_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.data };
        case API_DETAILED_GAINERS_FAILURE:
            return { ...state, fetching: false, error: action.error, data: [] };
        case API_DETAILED_GAINERS_RESET:
            return { ...state, error: null, data: [] };
        default:
            return state;
    }
}