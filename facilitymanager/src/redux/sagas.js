import {ActionTypes} from "./actions";
import {
    getAgendasForTimeAndType,
    getCurrentUserBookings,
    submitScheduleRoom,
    removeBooking
} from "./sagas/sagaCalendar";
import {takeEvery} from 'redux-saga/effects'
import {addEditAppPropertySaga, closeModalDialog, showModalDialog, solvePromise} from "./sagas/saga";
import {getAllRooms, getRoomsAndAgendasForCriteria} from "./sagas/sagaRooms";
import {updateUserInfo} from "./sagas/sagaAut0";

export default function* sagas() {
    yield takeEvery(ActionTypes.UPDATE_USER_INFO, updateUserInfo)
    yield takeEvery(ActionTypes.ADD_EDIT_APP_PROPERTY, addEditAppPropertySaga);
    yield takeEvery(ActionTypes.SUBMIT_SCHEDULE_ROOM, submitScheduleRoom);
    yield takeEvery(ActionTypes.GET_AGENDAS, getAgendasForTimeAndType);
    yield takeEvery(ActionTypes.GET_ALL_ROOMS, getAllRooms);
    yield takeEvery(ActionTypes.CLOSE_MODAL, closeModalDialog);
    yield takeEvery(ActionTypes.SHOW_MODAL, showModalDialog);
    yield takeEvery(ActionTypes.SOLVE_PROMISE, solvePromise);
    yield takeEvery(ActionTypes.GET_CURRENT_USER_BOOKINGS, getCurrentUserBookings);
    yield takeEvery(ActionTypes.GET_ROOMS_AND_AGENDAS, getRoomsAndAgendasForCriteria);
    yield takeEvery(ActionTypes.REMOVE_BOOKING, removeBooking)

}
