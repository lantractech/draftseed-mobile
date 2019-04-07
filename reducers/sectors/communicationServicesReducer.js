import {
    SECTOR_COMMUNICATION_SERVICES_REQUEST,
    SECTOR_COMMUNICATION_SERVICES_SUCCESS,
    SECTOR_COMMUNICATION_SERVICES_FAILURE,
    SECTOR_COMMUNICATION_SERVICES_RESET
} from 'actions/actionTypes'

// reducer with initial state
const initialState = {
    fetching: false,
    error: null,
    data: []
};

export function sectorCommunicationServices(state = initialState, action) {
    switch (action.type) {
        case SECTOR_COMMUNICATION_SERVICES_REQUEST:
            return { ...state, fetching: true, error: null };
        case SECTOR_COMMUNICATION_SERVICES_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.data };
        case SECTOR_COMMUNICATION_SERVICES_FAILURE:
            return { ...state, fetching: false, error: action.error, data: [] };
        case SECTOR_COMMUNICATION_SERVICES_RESET:
            return { ...state, error: null, data: [] };
        default:
            return state;
    }
}