import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import config from 'config/default.json'
import {
    API_DETAILED_GAINERS_REQUEST,
    API_DETAILED_GAINERS_SUCCESS,
    API_DETAILED_GAINERS_FAILURE,
    API_DETAILED_GAINERS_RESET
} from 'actions/actionTypes'

const param = '?param=topGainers&sector=Communication%20Services&sector=Consumer%20Discretionary&sector=Materials&sector=Health%20Care&sector=Technology&sector=Financials&sector=Industrials&sector=Energy&sector=Consumer%20Staples&sector=Utilities&sector=Real%20Estate'

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherGainers() {
    yield takeLatest(API_DETAILED_GAINERS_REQUEST, workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchAPI() {
    return axios({
        method: "get",
        url: `${config.awsLambda.currentStats.url}${param}`,
        timeout: config.awsLambda.currentStats.timeout
    });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
    try {
        yield put({ type: API_DETAILED_GAINERS_RESET });

        const response = yield call(fetchAPI);
        const data = response.data;

        // dispatch a success action to the store with the new dog
        yield put({ type: API_DETAILED_GAINERS_SUCCESS, data });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: API_DETAILED_GAINERS_FAILURE, error });
    }
}