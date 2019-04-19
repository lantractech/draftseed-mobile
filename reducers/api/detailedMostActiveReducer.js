import {
    API_DETAILED_MOST_ACTIVE_REQUEST,
    API_DETAILED_MOST_ACTIVE_SUCCESS,
    API_DETAILED_MOST_ACTIVE_FAILURE,
    API_DETAILED_MOST_ACTIVE_RESET
} from 'actions/actionTypes'

// reducer with initial state
const initialState = {
    fetching: false,
    error: null,
    data: []
};

export function detailedMostActive(state = initialState, action) {
    switch (action.type) {
        case API_DETAILED_MOST_ACTIVE_REQUEST:
            return { ...state, fetching: true, error: null };
        case API_DETAILED_MOST_ACTIVE_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.data };
        case API_DETAILED_MOST_ACTIVE_FAILURE:
            return { ...state, fetching: false, error: action.error, data: [] };
        case API_DETAILED_MOST_ACTIVE_RESET:
            return { ...state, error: null, data: [] };
        default:
            return state;
    }
}