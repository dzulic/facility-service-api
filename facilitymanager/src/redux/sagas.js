import {ActionTypes} from "./actions";
import {getAvailableRoomsForTimeAndType, submitScheduleRoom} from "./sagaCalendarService";
import {takeEvery} from 'redux-saga/effects'
import {addEditAppPropertySaga, closeModalDialog, showModalDialog} from "./saga";
import {getAllRooms} from "./sagaRoomsService";

export default function* sagas() {
    yield takeEvery(ActionTypes.ADD_EDIT_APP_PROPERTY, addEditAppPropertySaga);
    yield takeEvery(ActionTypes.SUBMIT_SCHEDULE_ROOM, submitScheduleRoom);
    yield takeEvery(ActionTypes.GET_ROOMS_AVAILABILITY, getAvailableRoomsForTimeAndType);
    yield takeEvery(ActionTypes.GET_ALL_ROOMS, getAllRooms);
    yield takeEvery(ActionTypes.CLOSE_MODAL, closeModalDialog)
    yield takeEvery(ActionTypes.SHOW_MODAL, showModalDialog)
}
