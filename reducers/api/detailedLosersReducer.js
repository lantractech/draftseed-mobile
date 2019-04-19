import {
    API_DETAILED_LOSERS_REQUEST,
    API_DETAILED_LOSERS_SUCCESS,
    API_DETAILED_LOSERS_FAILURE,
    API_DETAILED_LOSERS_RESET
} from 'actions/actionTypes'

// reducer with initial state
const initialState = {
    fetching: false,
    error: null,
    data: []
};

export function detailedLosers(state = initialState, action) {
    switch (action.type) {
        case API_DETAILED_LOSERS_REQUEST:
            return { ...state, fetching: true, error: null };
        case API_DETAILED_LOSERS_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.data };
        case API_DETAILED_LOSERS_FAILURE:
            return { ...state, fetching: false, error: action.error, data: [] };
        case API_DETAILED_LOSERS_RESET:
            return { ...state, error: null, data: [] };
        default:
            return state;
    }
}