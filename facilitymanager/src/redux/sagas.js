import {ActionTypes} from "./actions";
import {addEditAppPropertySaga} from "./saga";
import {takeEvery} from 'redux-saga/effects'

export default function* sagas() {
    yield takeEvery(ActionTypes.ADD_EDIT_APP_PROPERTY, addEditAppPropertySaga);
}
