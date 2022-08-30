import {handleApiFetchGET} from "../../api/Api";
import {call, put} from "redux-saga/effects";
import {ActionTypes} from "../actions";
import {AVAILABLE_ROOMS} from "../../utils/Utils";

export const REST_ROOT_ENDPOINT = "http://localhost:8082/";

export function* getAllRooms() {
    try {
        const response = yield call(
            () => new Promise((resolve) => {
                handleApiFetchGET(REST_ROOT_ENDPOINT + "rooms").then((_result) => {
                    resolve(_result);
                });
            }))


        if (response === true) {
            //redirect to homepage
            window.location = "/"
        }

        if (response) {
            const availableRooms = {
                key: AVAILABLE_ROOMS, value: response
            };

            yield put({
                type: ActionTypes.ADD_EDIT_APP_PROP_STORE, property: availableRooms
            });
        }

    } catch
        (e) {
        console.log(e)
        yield put({
            type: 'SHOW_ERROR_MODAL'
        });
    }
}