import {ActionTypes} from "./actions";
import {call, put} from "redux-saga/effects";
import {handleApiFetchGET, handleApiFetchPOST, REST_ROOT_ENDPOINT} from "../api/Api";

//add or edit single property
export function* addEditAppPropertySaga(action) {

    if (action.property) {
        const newProperty = {
            key: action.property.key, value: action.property.value
        };

        yield put({
            type: ActionTypes.ADD_EDIT_APP_PROP_STORE, property: newProperty
        });
    } else {
        console.log("NO SAGA")
    }

}

//add or edit single property
export function* removeAppProperty(action) {

    if (action.property) {
        const property = {
            key: action.property.key
        };

        yield put({
            type: ActionTypes.REMOVE_APP_PROP_STORE, property: property
        });
    }

}

export function* submitScheduleRoom(action) {
    //TODO
    //  yield put(showWaitingDialog('loginUser'));

    try {
        const response = yield call(handleApiFetchPOST(REST_ROOT_ENDPOINT + "calendars/reservations", {
            roomId: action.property.roomId,
            selectedDate: action.property.selectedDate,
            selectedTime: action.property.selectedTime,
            description: "test"
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

    try {
        const response = yield call(handleApiFetchGET(REST_ROOT_ENDPOINT + "calendars/rooms?" +
            `selectedDate=${action.property.selectedDate}
            &selectedTime=${action.property.selectedTime}
            &roomType=${action.property.roomType}`));

        if (response === true) {
            //redirect to homepage
            window.location = "/"
        }

        if (response) {
            const availableRooms = {
                key: 'AVAILABLE_ROOMS', value: response
            };

            yield put({
                type: 'ADD_EDIT_APP_PROP_STORE', property: availableRooms
            });
        }

    } catch (e) {
        console.log(e)
        yield put({
            type: 'SHOW_ERROR_MODAL'
        });
    }
}