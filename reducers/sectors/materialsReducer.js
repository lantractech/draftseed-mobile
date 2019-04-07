import {
    SECTOR_MATERIALS_REQUEST,
    SECTOR_MATERIALS_SUCCESS,
    SECTOR_MATERIALS_FAILURE,
    SECTOR_MATERIALS_RESET
} from 'actions/actionTypes'

// reducer with initial state
const initialState = {
    fetching: false,
    error: null,
    data: []
};

export function sectorMaterials(state = initialState, action) {
    switch (action.type) {
        case SECTOR_MATERIALS_REQUEST:
            return { ...state, fetching: true, error: null };
        case SECTOR_MATERIALS_SUCCESS:
            return { ...state, fetching: false, error: null, data: action.data };
        case SECTOR_MATERIALS_FAILURE:
            return { ...state, fetching: false, error: action.error, data: [] };
        case SECTOR_MATERIALS_RESET:
            return { ...state, error: null, data: [] };
        default:
            return state;
    }
}