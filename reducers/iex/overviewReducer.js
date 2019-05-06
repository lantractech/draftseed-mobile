import {
    IEX_SECTOR_OVERVIEW_REQUEST,
    IEX_SECTOR_OVERVIEW_SUCCESS,
    IEX_SECTOR_OVERVIEW_FAILURE,
    IEX_SECTOR_OVERVIEW_RESET
} from 'actions/actionTypes'

// reducer with initial state
const initialState = {
    fetching: false,
    error: null,
    data: []
};

export function iexOverview(state = initialState, action) {
    switch (action.type) {
        case IEX_SECTOR_OVERVIEW_REQUEST:
            return { ...state, fetching: true, error: null };
        case IEX_SECTOR_OVERVIEW_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.data };
        case IEX_SECTOR_OVERVIEW_FAILURE:
            return { ...state, fetching: false, error: action.error, data: [] };
        case IEX_SECTOR_OVERVIEW_RESET:
            return { ...state, error: null, data: [] };
        default:
            return state;
    }
}