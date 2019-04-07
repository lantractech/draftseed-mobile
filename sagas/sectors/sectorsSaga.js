import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import config from 'config/default.json'
import {
    SECTORS_REQUEST,
    SECTORS_SUCCESS,
    SECTORS_FAILURE,
    SECTORS_RESET
} from 'actions/actionTypes'

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSectors() {
    yield takeLatest(SECTORS_REQUEST, workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchSector(param,sectors) {
    return axios({
        method: "get",
        url: `${config.awsLambda.currentStats.url}?param=${param}${sectors}`,
        timeout: config.awsLambda.currentStats.timeout
    });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga(action) {
    try {
        yield put({ type: SECTORS_RESET });

        const response = yield call(fetchSector, action.param, action.sectors);
        const data = response.data;

        // dispatch a success action to the store with the new dog
        yield put({ type: SECTORS_SUCCESS, data });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: SECTORS_FAILURE, error });
    }
}