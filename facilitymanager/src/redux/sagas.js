import {takeEvery} from 'redux-saga/effects'
import {updateUserInfo} from "./sagas/sagaAut0";
import {ActionTypes} from "./actions";
import {
    addEditAppPropertySaga,
    closeModalDialog,
    showModalDialog
} from "react-booking-facility-component/dist/lib/sagas/saga";
import {
    getAgendasForTimeAndType,
    getCurrentUserBookings, removeBooking,
    submitScheduleRoom,
    editBooking
} from "react-booking-facility-component/dist/lib/sagas/sagaCalendar";
import {getAllRooms, getRoomsAndAgendasForCriteria} from "react-booking-facility-component/dist/lib/sagas/sagaRooms";

export default function* sagas() {
    yield takeEvery(ActionTypes.UPDATE_USER_INFO, updateUserInfo)
    yield takeEvery(ActionTypes.ADD_EDIT_APP_PROPERTY, addEditAppPropertySaga);
    yield takeEvery(ActionTypes.SUBMIT_SCHEDULE_ROOM, submitScheduleRoom);
    yield takeEvery(ActionTypes.GET_AGENDAS, getAgendasForTimeAndType);
    yield takeEvery(ActionTypes.GET_ALL_ROOMS, getAllRooms);
    yield takeEvery(ActionTypes.CLOSE_MODAL, closeModalDialog);
    yield takeEvery(ActionTypes.SHOW_MODAL, showModalDialog);
    yield takeEvery(ActionTypes.GET_CURRENT_USER_BOOKINGS, getCurrentUserBookings);
    yield takeEvery(ActionTypes.GET_ROOMS_AND_AGENDAS, getRoomsAndAgendasForCriteria);
    yield takeEvery(ActionTypes.REMOVE_BOOKING, removeBooking)
    yield takeEvery(ActionTypes.EDIT_BOOKING, editBooking)

}
