import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import config from 'config/default.json'
import {
    IEX_MOST_ACTIVE_REQUEST,
    IEX_MOST_ACTIVE_SUCCESS,
    IEX_MOST_ACTIVE_FAILURE,
    IEX_MOST_ACTIVE_RESET
} from 'actions/actionTypes'

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherMostActive() {
    yield takeLatest(IEX_MOST_ACTIVE_REQUEST, workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchIEX() {
    return axios({
        method: "get",
        url: `${config.iex.base.url}${config.iex.routes.mostActive}`,
        timeout: config.iex.base.timeout
    });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
    try {
        yield put({ type: IEX_MOST_ACTIVE_RESET });

        const response = yield call(fetchIEX);
        const data = response.data;

        // dispatch a success action to the store with the new dog
        yield put({ type: IEX_MOST_ACTIVE_SUCCESS, data });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: IEX_MOST_ACTIVE_FAILURE, error });
    }
}