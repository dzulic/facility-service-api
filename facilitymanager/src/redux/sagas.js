import {ActionTypes} from "./actions";
import {addEditAppPropertySaga, getAvailableRoomsForTimeAndType, submitScheduleRoom} from "./saga";
import {takeEvery} from 'redux-saga/effects'

export default function* sagas() {
    yield takeEvery(ActionTypes.ADD_EDIT_APP_PROPERTY, addEditAppPropertySaga);
    yield takeEvery(ActionTypes.SUBMIT_SCHEDULE_ROOM, submitScheduleRoom);
    yield takeEvery(ActionTypes.SUBMIT_GET_ROOMS, getAvailableRoomsForTimeAndType)
}
