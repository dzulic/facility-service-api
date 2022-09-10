export function getValueAppPropertyStore(state, key) {
    if (state.app) {
        const property = state.app.filter(function (property) {
            return property.key === key;
        });

        let ret = (property && property.length !== 0) ? property[0].value : null;
        return ret
    }
    return null;
}

export const SELECTED_DATE = 'SELECTED_DATE'
export const SELECTED_TIME = 'SELECTED_TIME'
export const ROOM_TYPE = 'ROOM_TYPE'
export const ALL_ROOMS = 'ALL_ROOMS'
export const AGENDA_ENTRIES = 'AGENDA_ENTRIES'
export const CURRENT_USER_ENTRIES = 'CURRENT_USER_ENTRIES'
export const AVAILABLE_ROOMS = 'AVAILABLE_ROOMS'