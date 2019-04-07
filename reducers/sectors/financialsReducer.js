import {
    SECTOR_FINANCIALS_REQUEST,
    SECTOR_FINANCIALS_SUCCESS,
    SECTOR_FINANCIALS_FAILURE,
    SECTOR_FINANCIALS_RESET
} from 'actions/actionTypes'

// reducer with initial state
const initialState = {
    fetching: false,
    error: null,
    data: []
};

export function sectorFinancials(state = initialState, action) {
    switch (action.type) {
        case SECTOR_FINANCIALS_REQUEST:
            return { ...state, fetching: true, error: null };
        case SECTOR_FINANCIALS_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.data };
        case SECTOR_FINANCIALS_FAILURE:
            return { ...state, fetching: false, error: action.error, data: [] };
        case SECTOR_FINANCIALS_RESET:
            return { ...state, error: null, data: [] };
        default:
            return state;
    }
}