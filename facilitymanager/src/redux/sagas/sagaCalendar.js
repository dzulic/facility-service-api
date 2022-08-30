import {call, put} from "redux-saga/effects";
import {handleApiFetchGET, handleApiFetchPOST} from "../../api/Api";
import {AGENDA_ENTRIES} from "../../utils/Utils";
import {ActionTypes} from "../actions";
import {history} from "../../utils/history";

export const REST_ROOT_ENDPOINT = "http://localhost:8081/calendars";


export function* submitScheduleRoom(action) {
    console.log(" json", JSON.stringify({
        roomId: action.property.roomId,
        selectedTimeStart: action.property.selectedTimeStart,
        selectedTimeEnd: action.property.selectedTimeEnd,
        description: action.property.description
    }))
    // let accessToken = action.property.accessToken
    // const accessTokenResolved = yield call(accessToken)

    try {
        const response = yield call(() => new Promise((resolve) => {
            handleApiFetchPOST(REST_ROOT_ENDPOINT + "/reservations", {
                roomId: action.property.roomId,
                selectedTimeStart: action.property.selectedTimeStart,
                selectedTimeEnd: action.property.selectedTimeEnd,
                description: action.property.description
            }).then((_result) => {
                resolve(_result);
            });
        }))

        if (response.success === false) {
            throw new Error(response.message);
        }

        if (response) {
            //TODO add success
        }

    } catch (e) {
        console.log(e)
        yield put({
            type: 'SHOW_ERROR_MODAL'
        });
    }
}

export function* getAvailableRoomsForTimeAndType(action) {

    try {
        const response = yield call(() => new Promise((resolve) => {
            handleApiFetchGET(`${REST_ROOT_ENDPOINT}/availability?${new URLSearchParams({
                selectedTimeStart: action.property.selectedDate,
                roomType: action.property.roomType
            })}`).then((_result) => {
                resolve(_result);
            });
        }))

        if (response) {
            yield put({
                type: ActionTypes.ADD_EDIT_APP_PROP_STORE, property: {
                    key: AGENDA_ENTRIES, value: response
                }
            });
            //TODO REMOVE HISTORY
            // yield call(history.push, "/rooms");
        }

    } catch
        (e) {
        console.log(e)
        //TODO SHOW_ERROR_MODAL
        yield put({
            type: 'SHOW_ERROR_MODAL'
        });
    }
}