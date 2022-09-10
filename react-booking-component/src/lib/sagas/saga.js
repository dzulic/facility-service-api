import {put} from "redux-saga/effects";
import {ActionTypes} from "../actions";

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

export function* closeModalDialog(action) {
    if (action.property) {
        yield put({
            type: ActionTypes.CLOSE_MODAL_STORE
        });
    }
}

export function* showModalDialog(action) {
    if (action.property) {
        yield put({
            type: ActionTypes.SHOW_MODAL_STORE, property: action.property
        });
    }
}