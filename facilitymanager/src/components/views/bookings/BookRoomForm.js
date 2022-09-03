import React, {Component} from 'react';
import BookingDatePicker from './BookingDatePickerComponent';
import Box from '@mui/material/Box';
import BookingRoomType from "./BookingRoomTypeComponent";
import {connect} from "react-redux";
import {Field, getFormValues, reduxForm} from "redux-form";
import {
    AGENDA_ENTRIES,
    ALL_ROOMS,
    getValueAppPropertyStore,
    ROOM_TYPE,
    SELECTED_DATE,
    SELECTED_TIME
} from "../../../utils/Utils";
import {Button, Typography} from "@mui/material";
import {ActionTypes} from "../../../redux/actions";
import ModalDialog from "../../base/ModalDialog";
import AgendaBooking from "./BookRoomAgendaForm";
import {withAuth0} from "@auth0/auth0-react";
import {renderTextField} from "../../base/MuiTextFieldRendering";


class BookRoomForm extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {getAccessTokenSilently} = this.props.auth0;
        const {dispatch, availableRooms} = this.props
        if (availableRooms == null) {
            dispatch({type: ActionTypes.GET_ALL_ROOMS, property: {accessToken: getAccessTokenSilently}})
            dispatch({type: ActionTypes.GET_CURRENT_USER_BOOKINGS, property: {accessToken: getAccessTokenSilently}})
        }
    }

    onSubmit = () => {
        const {getAccessTokenSilently} = this.props.auth0;
        const {dispatch, selectedDate, roomType, formValues} = this.props;
        dispatch({
            type: ActionTypes.GET_ROOMS_AND_AGENDAS,
            property: {
                roomType: roomType,
                selectedDate: selectedDate,
                computerPlacesMin: (formValues != null) ? formValues.computerPlaces : 0,
                sittingPlacesMin: (formValues != null) ? formValues.sittingPlaces : 0,
                accessToken: getAccessTokenSilently
            }
        })
    }

    render() {
        return (
            <> <ModalDialog/>
                <form>
                    <Box
                        sx={{
                            padding: '20px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gridTemplateAreas: ` "title title"
                    "selectRoomType selectRoomType"
                    "selectDay selectDay"
                    "selectRoom1 selectRoom2"
                    "button button"
                    "timeline timeline"`,
                            gap: 1,
                            gridTemplateRows: 'auto'
                        }}>
                        <Box sx={{gridArea: 'title', padding: '20px'}}>
                            <Typography variant="h5" component="h5">Please fill in all the search criteria</Typography>
                        </Box>
                        <Box sx={{gridArea: 'selectRoomType'}}>
                            <BookingRoomType></BookingRoomType>
                        </Box>
                        <Box sx={{gridArea: 'selectDay'}}>
                            <BookingDatePicker/>
                        </Box>
                        <Box sx={{gridArea: 'selectRoom1'}}>
                            <Typography>Computer Places Min:</Typography>
                            <Field
                                name="computerPlaces"
                                component={renderTextField}
                                label="Number of computer places"
                                variant="outlined"
                                required
                                fullWidth
                                type={"number"}
                                id="computerPlaces"
                                autoFocus
                            /></Box>
                        <Box sx={{gridArea: 'selectRoom2'}}>
                            <Typography>Sitting Places Min:</Typography>
                            <Field
                                name="sittingPlaces"
                                component={renderTextField}
                                label="Number of sitting places"
                                variant="outlined"
                                type={"number"}
                                required
                                fullWidth
                                id="sittingPlaces"
                                autoFocus
                            />
                        </Box>

                        {(this.props.roomType !== undefined && this.props.roomType != null && this.props.selectedDate != null) &&
                            <Box sx={{gridArea: 'button'}}>
                                <Button variant="contained" onClick={this.onSubmit}>Find rooms</Button>
                            </Box>
                        }
                        {this.props.agendaEntries &&
                            <Box
                                sx={{
                                    gridArea: "timeline",
                                    marginTop: '50px',
                                    marginBottom: '50px'
                                }}>
                                <AgendaBooking></AgendaBooking>
                            </Box>
                        }
                    </Box>
                </form>
            </>
        );
    }
}


function mapStateToProps(state) {
    return {
        roomType: getValueAppPropertyStore(state, ROOM_TYPE),
        selectedDate: getValueAppPropertyStore(state, SELECTED_DATE),
        selectedTime: getValueAppPropertyStore(state, SELECTED_TIME),
        availableRooms: getValueAppPropertyStore(state, ALL_ROOMS),
        agendaEntries: getValueAppPropertyStore(state, AGENDA_ENTRIES),
        formValues: getFormValues("app")(state)
    }
}

export default withAuth0(connect(mapStateToProps)(reduxForm({
    form: "app",
    // TO REMOVE
    destroyOnUnmount: false,
    enableReinitialize: true,
})(BookRoomForm)))
