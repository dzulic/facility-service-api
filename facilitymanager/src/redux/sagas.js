import {ActionTypes} from "./actions";
import {getAvailableRoomsForTimeAndType, submitScheduleRoom, getCurrentUserBookings} from "./sagas/sagaCalendar";
import {takeEvery} from 'redux-saga/effects'
import {addEditAppPropertySaga, closeModalDialog, showModalDialog, solvePromise} from "./sagas/saga";
import {getAllRooms} from "./sagas/sagaRooms";
import {updateUserInfo} from "./sagas/sagaAut0";

export default function* sagas() {
    yield takeEvery(ActionTypes.UPDATE_USER_INFO, updateUserInfo)
    yield takeEvery(ActionTypes.ADD_EDIT_APP_PROPERTY, addEditAppPropertySaga);
    yield takeEvery(ActionTypes.SUBMIT_SCHEDULE_ROOM, submitScheduleRoom);
    yield takeEvery(ActionTypes.GET_ROOMS_AVAILABILITY, getAvailableRoomsForTimeAndType);
    yield takeEvery(ActionTypes.GET_ALL_ROOMS, getAllRooms);
    yield takeEvery(ActionTypes.CLOSE_MODAL, closeModalDialog);
    yield takeEvery(ActionTypes.SHOW_MODAL, showModalDialog);
    yield takeEvery(ActionTypes.SOLVE_PROMISE, solvePromise)
    yield takeEvery(ActionTypes.GET_CURRENT_USER_BOOKINGS, getCurrentUserBookings)
}
