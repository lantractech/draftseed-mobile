import {
    SECTOR_TECHNOLOGY_REQUEST,
    SECTOR_TECHNOLOGY_SUCCESS,
    SECTOR_TECHNOLOGY_FAILURE,
    SECTOR_TECHNOLOGY_RESET
} from 'actions/actionTypes'

// reducer with initial state
const initialState = {
    fetching: false,
    error: null,
    data: []
};

export function sectorTechnology(state = initialState, action) {
    switch (action.type) {
        case SECTOR_TECHNOLOGY_REQUEST:
            return { ...state, fetching: true, error: null };
        case SECTOR_TECHNOLOGY_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.data };
        case SECTOR_TECHNOLOGY_FAILURE:
            return { ...state, fetching: false, error: action.error, data: [] };
        case SECTOR_TECHNOLOGY_RESET:
            return { ...state, error: null, data: [] };
        default:
            return state;
    }
}