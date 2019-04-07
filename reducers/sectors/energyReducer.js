import {
    SECTOR_ENERGY_REQUEST,
    SECTOR_ENERGY_SUCCESS,
    SECTOR_ENERGY_FAILURE,
    SECTOR_ENERGY_RESET
} from 'actions/actionTypes'

// reducer with initial state
const initialState = {
    fetching: false,
    error: null,
    data: []
};

export function sectorEnergy(state = initialState, action) {
    switch (action.type) {
        case SECTOR_ENERGY_REQUEST:
            return { ...state, fetching: true, error: null };
        case SECTOR_ENERGY_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.data };
        case SECTOR_ENERGY_FAILURE:
            return { ...state, fetching: false, error: action.error, data: [] };
        case SECTOR_ENERGY_RESET:
            return { ...state, error: null, data: [] };
        default:
            return state;
    }
}