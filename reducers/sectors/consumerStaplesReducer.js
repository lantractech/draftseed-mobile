import {
    SECTOR_CONSUMER_STAPLES_REQUEST,
    SECTOR_CONSUMER_STAPLES_SUCCESS,
    SECTOR_CONSUMER_STAPLES_FAILURE,
    SECTOR_CONSUMER_STAPLES_RESET
} from 'actions/actionTypes'

// reducer with initial state
const initialState = {
    fetching: false,
    error: null,
    data: []
};

export function sectorConsumerStaples(state = initialState, action) {
    switch (action.type) {
        case SECTOR_CONSUMER_STAPLES_REQUEST:
            return { ...state, fetching: true, error: null };
        case SECTOR_CONSUMER_STAPLES_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.data };
        case SECTOR_CONSUMER_STAPLES_FAILURE:
            return { ...state, fetching: false, error: action.error, data: [] };
        case SECTOR_CONSUMER_STAPLES_RESET:
            return { ...state, error: null, data: [] };
        default:
            return state;
    }
}