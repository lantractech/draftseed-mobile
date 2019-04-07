import {
    SECTOR_CONSUMER_DISCRETIONARY_REQUEST,
    SECTOR_CONSUMER_DISCRETIONARY_SUCCESS,
    SECTOR_CONSUMER_DISCRETIONARY_FAILURE,
    SECTOR_CONSUMER_DISCRETIONARY_RESET
} from 'actions/actionTypes'

// reducer with initial state
const initialState = {
    fetching: false,
    error: null,
    data: []
};

export function sectorConsumerDiscretionary(state = initialState, action) {
    switch (action.type) {
        case SECTOR_CONSUMER_DISCRETIONARY_REQUEST:
            return { ...state, fetching: true, error: null };
        case SECTOR_CONSUMER_DISCRETIONARY_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.data };
        case SECTOR_CONSUMER_DISCRETIONARY_FAILURE:
            return { ...state, fetching: false, error: action.error, data: [] };
        case SECTOR_CONSUMER_DISCRETIONARY_RESET:
            return { ...state, error: null, data: [] };
        default:
            return state;
    }
}