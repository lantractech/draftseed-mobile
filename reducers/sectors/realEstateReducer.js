import {
    SECTOR_REAL_ESTATE_REQUEST,
    SECTOR_REAL_ESTATE_SUCCESS,
    SECTOR_REAL_ESTATE_FAILURE,
    SECTOR_REAL_ESTATE_RESET
} from 'actions/actionTypes'

// reducer with initial state
const initialState = {
    fetching: false,
    error: null,
    data: []
};

export function sectorRealEstate(state = initialState, action) {
    switch (action.type) {
        case SECTOR_REAL_ESTATE_REQUEST:
            return { ...state, fetching: true, error: null };
        case SECTOR_REAL_ESTATE_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.data };
        case SECTOR_REAL_ESTATE_FAILURE:
            return { ...state, fetching: false, error: action.error, data: [] };
        case SECTOR_REAL_ESTATE_RESET:
            return { ...state, error: null, data: [] };
        default:
            return state;
    }
}