import {put} from 'redux-saga/effects'
import {ActionTypes} from "./actions";

//add or edit single property
export function* addEditAppPropertySaga(action) {

    if (action.property) {
        const newProperty = {
            key: action.property.key,
            value: action.property.value
        };

        yield put({
            type: ActionTypes.ADD_EDIT_APP_PROP_STORE,
            property: newProperty
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
            type: ActionTypes.REMOVE_APP_PROP_STORE,
            property: property
        });
    }

}
