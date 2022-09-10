import {handleApiFetchGET} from "../api/Api";
import {call, put} from "redux-saga/effects";
import {ActionTypes} from "../actions";
import {ALL_ROOMS, AVAILABLE_ROOMS} from "../utils/Utils";

export const REST_ROOT_ENDPOINT = "http://localhost:8082/rooms";

export function* getAllRooms(action) {
    const accessToken = yield call(action.property.accessToken)

    try {
        const response = yield call(() => new Promise((resolve) => {
            handleApiFetchGET(REST_ROOT_ENDPOINT, accessToken)
                .then((_result) => {
                    resolve(_result);
                });
        }))

        if (response === true) {
            //redirect to homepage
            window.location = "/"
        }

        if (response) {
            const availableRooms = {
                key: ALL_ROOMS, value: response
            };

            yield put({
                type: ActionTypes.ADD_EDIT_APP_PROP_STORE, property: availableRooms
            });
        }

    } catch (e) {
        console.log(e)
        yield put({
            type: 'SHOW_ERROR_MODAL'
        });
    }
}

export function* getRoomsAndAgendasForCriteria(action) {
    const accessToken = yield call(action.property.accessToken)

    try {
        const response = yield call(
            handleApiFetchGET, `${REST_ROOT_ENDPOINT}/${action.property.roomType}?${new URLSearchParams({
                computerPlacesMin: action.property.computerPlacesMin || 0,
                sittingPlacesMin: action.property.sittingPlacesMin || 0
            })}`, accessToken
        )
        if (response) {
            yield put({
                type: ActionTypes.ADD_EDIT_APP_PROP_STORE, property: {
                    key: AVAILABLE_ROOMS, value: response
                }
            });
            yield put({
                type: ActionTypes.GET_AGENDAS, property: {
                    selectedDate: action.property.selectedDate,
                    roomIds: response,
                    accessToken: action.property.accessToken
                }
            })
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