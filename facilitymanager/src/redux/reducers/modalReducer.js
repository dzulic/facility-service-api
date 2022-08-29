import {ActionTypes} from "../actions";

export const modalReducer = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.SHOW_MODAL_STORE:
            return {SHOW_MODAL_PROPERTY: action.property};
        case ActionTypes.CLOSE_MODAL_STORE: {
            return {}
        }
        default:
            return state;
    }
}