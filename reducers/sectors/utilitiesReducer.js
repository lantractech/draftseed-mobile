import {
    SECTOR_UTILITIES_REQUEST,
    SECTOR_UTILITIES_SUCCESS,
    SECTOR_UTILITIES_FAILURE,
    SECTOR_UTILITIES_RESET
} from 'actions/actionTypes'

// reducer with initial state
const initialState = {
    fetching: false,
    error: null,
    data: []
};

export function sectorUtilities(state = initialState, action) {
    switch (action.type) {
        case SECTOR_UTILITIES_REQUEST:
            return { ...state, fetching: true, error: null };
        case SECTOR_UTILITIES_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.data };
        case SECTOR_UTILITIES_FAILURE:
            return { ...state, fetching: false, error: action.error, data: [] };
        case SECTOR_UTILITIES_RESET:
            return { ...state, error: null, data: [] };
        default:
            return state;
    }
}