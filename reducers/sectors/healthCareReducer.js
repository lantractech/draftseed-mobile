import {
    SECTOR_HEALTH_CARE_REQUEST,
    SECTOR_HEALTH_CARE_SUCCESS,
    SECTOR_HEALTH_CARE_FAILURE,
    SECTOR_HEALTH_CARE_RESET
} from 'actions/actionTypes'

// reducer with initial state
const initialState = {
    fetching: false,
    error: null,
    data: []
};

export function sectorHealthCare(state = initialState, action) {
    switch (action.type) {
        case SECTOR_HEALTH_CARE_REQUEST:
            return { ...state, fetching: true, error: null };
        case SECTOR_HEALTH_CARE_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.data };
        case SECTOR_HEALTH_CARE_FAILURE:
            return { ...state, fetching: false, error: action.error, data: [] };
        case SECTOR_HEALTH_CARE_RESET:
            return { ...state, error: null, data: [] };
        default:
            return state;
    }
}