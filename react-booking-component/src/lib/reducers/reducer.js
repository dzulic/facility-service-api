import React from "react";
import {ActionTypes} from "../actions";

export const AppReducer = (state = [], action) => {
    const property = action.property;

    switch (action.type) {
        case ActionTypes.ADD_EDIT_APP_PROP_STORE:
            const edit = state.filter(function (stateProperty) {
                return stateProperty.key === property.key;
            })[0];

            if (!edit) {
                return [...state, property];
            } else {
                return state.map(stateProperty =>
                    stateProperty.key === property.key ? {...action.property} : stateProperty
                );
            }
        case ActionTypes.REMOVE_APP_PROP_STORE:
            return state.filter(function (stateProperty) {
                    return stateProperty.key !== property.key
                }
            );
        default:
            return state;
    }
};
