import {ActionTypes} from "../actions";

export const modalReducer = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.CLOSE_MODAL_STORE: {
            return {}
        }
        //TODO REFACTOR NAMING
        case ActionTypes.SHOW_MODAL_STORE:
            return {SHOW_MODAL_PROPERTY: action.property, SHOW_ADD_BOOKING_MODAL: true};
        case ActionTypes.SHOW_UPDATE_USER_MODAL:
            return {SHOW_MODAL_PROPERTY: action.property, SHOW_UPDATE_USER_MODAL: true};
        default:
            return state;
    }
}