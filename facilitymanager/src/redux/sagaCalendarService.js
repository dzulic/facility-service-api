import {call, put} from "redux-saga/effects";
import {handleApiFetch} from "../api/Api";
import {AGENDA_ENTRIES} from "../utils/Utils";
import {ActionTypes} from "./actions";
import {history} from "./history";

export const REST_ROOT_ENDPOINT = "http://localhost:8081/calendars";


export function* submitScheduleRoom(action) {
    //TODO
    //  yield put(showWaitingDialog('loginUser'));

    try {
        const response = yield call(handleApiFetch(REST_ROOT_ENDPOINT + "/reservations", {
            roomId: action.property.roomId,
            selectedDate: action.property.selectedDate,
            selectedTimeStart:
                new Date(`${action.property.selectedDate}T${action.property.selectedTimeStart}:00.000+02:00`).toISOString(),
            selectedTimeEnd:
                new Date(`${action.property.selectedDate}T${action.property.selectedTimeEnd}:00.000+02:00`).toISOString(),
            description: action.property.description
        }));


        if (response.success === false) {
            throw new Error(response.message);
        }

        if (response === true) {
            //redirect to homepage
            window.location = "/"
        }


        if (response) {
            const loginProperty = {
                key: 'LOGIN_USER', value: response
            };

            yield put({
                type: 'ADD_EDIT_APP_PROP_STORE', property: loginProperty
            });
        }

    } catch (e) {
        console.log(e)
        yield put({
            type: 'SHOW_ERROR_MODAL'
        });
    }
}

export function* getAvailableRoomsForTimeAndType(action) {
    //TODO
    //  yield put(showWaitingDialog('loginUser'));
    console.log("TIME", action.property.selectedDate)
    try {

        const response = yield call(() => new Promise((resolve) => {
            handleApiFetch(`${REST_ROOT_ENDPOINT}/availability?${new URLSearchParams({
                selectedTimeStart: action.property.selectedDate,
                roomType: action.property.roomType
            })}`).then((_result) => {
                resolve(_result);
            });
        }))
        console.log("RESPONSE", response)
        // window.location = "/rooms"

        if (response) {
            //redirect to homepage
            console.log("RESPONSE 1", response)
            yield put({
                type: ActionTypes.ADD_EDIT_APP_PROP_STORE, property: {
                    key: AGENDA_ENTRIES, value: response
                }
            });

            yield call(history.push, "/rooms");
        }

    } catch
        (e) {
        console.log(e)
        yield put({
            type: 'SHOW_ERROR_MODAL'
        });
    }
}