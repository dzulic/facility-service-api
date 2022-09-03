import {call, put} from "redux-saga/effects";
import {handleApiFetchGET, handleApiFetchPOST} from "../../api/Api";
import {AGENDA_ENTRIES, CURRENT_USER_ENTRIES} from "../../utils/Utils";
import {ActionTypes} from "../actions";

export const REST_ROOT_ENDPOINT = "http://localhost:8081/calendars";


export function* submitScheduleRoom(action) {
    console.log("SUBMIT", action)
    const accessToken = yield call(action.property.accessToken)
    let body = {
        roomId: action.property.roomId,
        selectedTimeStart: action.property.selectedTimeStart,
        selectedTimeEnd: action.property.selectedTimeEnd,
        description: action.property.description
    }

    try {
        const response = yield call(handleApiFetchPOST, REST_ROOT_ENDPOINT + "/reservations", body, accessToken)

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

export function* getAgendasForTimeAndType(action) {
    const accessToken = yield call(action.property.accessToken)
    console.log("GET A", action)
    try {
        const response = yield call(
            handleApiFetchGET, `${REST_ROOT_ENDPOINT}/availability?${new URLSearchParams({
                selectedTimeStart: action.property.selectedDate,
                roomsIds: action.property.roomIds
            })}`, accessToken
        )
        if (response) {
            yield put({
                type: ActionTypes.ADD_EDIT_APP_PROP_STORE, property: {
                    key: AGENDA_ENTRIES, value: response
                }
            });
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

export function* getCurrentUserBookings(action) {
    const accessToken = yield call(action.property.accessToken)
    try {
        const response = yield call(handleApiFetchGET, `${REST_ROOT_ENDPOINT}/reservations/current`, accessToken)

        if (response) {
            yield put({
                type: ActionTypes.ADD_EDIT_APP_PROP_STORE, property: {
                    key: CURRENT_USER_ENTRIES, value: response
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