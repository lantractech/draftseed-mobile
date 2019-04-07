import {
    SECTOR_INDUSTRIALS_REQUEST,
    SECTOR_INDUSTRIALS_SUCCESS,
    SECTOR_INDUSTRIALS_FAILURE,
    SECTOR_INDUSTRIALS_RESET
} from 'actions/actionTypes'

// reducer with initial state
const initialState = {
    fetching: false,
    error: null,
    data: []
};

export function sectorIndustrials(state = initialState, action) {
    switch (action.type) {
        case SECTOR_INDUSTRIALS_REQUEST:
            return { ...state, fetching: true, error: null };
        case SECTOR_INDUSTRIALS_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.data };
        case SECTOR_INDUSTRIALS_FAILURE:
            return { ...state, fetching: false, error: action.error, data: [] };
        case SECTOR_INDUSTRIALS_RESET:
            return { ...state, error: null, data: [] };
        default:
            return state;
    }
}