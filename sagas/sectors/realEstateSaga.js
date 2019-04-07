import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import config from 'config/default.json'
import {
    SECTOR_REAL_ESTATE_REQUEST,
    SECTOR_REAL_ESTATE_SUCCESS,
    SECTOR_REAL_ESTATE_FAILURE,
    SECTOR_REAL_ESTATE_RESET
} from 'actions/actionTypes'

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherRealEstate() {
    yield takeLatest(SECTOR_REAL_ESTATE_REQUEST, workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchSector(param) {
    return axios({
        method: "get",
        url: `${config.awsLambda.currentStats.url}?sector=Real%20Estate&param=${param}`,
        timeout: config.awsLambda.currentStats.timeout
    });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga(action) {
    try {
        yield put({ type: SECTOR_REAL_ESTATE_RESET });

        const response = yield call(fetchSector, action.param);
        const data = response.data;

        // dispatch a success action to the store with the new dog
        yield put({ type: SECTOR_REAL_ESTATE_SUCCESS, data });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: SECTOR_REAL_ESTATE_FAILURE, error });
    }
}