import React, {Component} from 'react';
import BookingDatePicker from './BookingDatePickerComponent';
import Box from '@mui/material/Box';
import BookingRoomType from "./BookingRoomTypeComponent";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {
    AGENDA_ENTRIES,
    AVAILABLE_ROOMS,
    getValueAppPropertyStore,
    ROOM_TYPE,
    SELECTED_DATE,
    SELECTED_TIME
} from "../../../utils/Utils";
import {Button} from "@mui/material";
import {ActionTypes} from "../../../redux/actions";
import ModalDialog from "../../base/ModalDialog";
import AgendaBooking from "./BookRoomAgendaForm";


class BookRoomForm extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch, availableRooms} = this.props
        if (availableRooms == null) {
            dispatch({type: ActionTypes.GET_ALL_ROOMS})
        }
    }

    onSubmit = () => {
        const {dispatch, selectedDate, selectedTime, roomType} = this.props;
        dispatch({
            type: ActionTypes.GET_ROOMS_AVAILABILITY,
            property: {
                roomType: roomType,
                selectedDate: selectedDate,
                selectedTime: selectedTime
            }
        });

    }


    render() {
        return (
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    gap: 3,
                    gridTemplateRows: 'auto'
                }}>
                <form>
                    <ModalDialog/>
                    <BookingRoomType></BookingRoomType>
                    {(this.props.roomType !== undefined && this.props.roomType != null) && <BookingDatePicker/>
                    }

                    {(this.props.roomType !== undefined && this.props.roomType != null && this.props.selectedDate != null) &&
                        <Button variant="contained" onClick={this.onSubmit}>SCHEDULE A ROOM</Button>
                    }
                    {this.props.agendaEntries &&
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(1, 1fr)',
                                gridTemplateRows: 'auto',
                                width: '50vw'
                            }}>
                            <AgendaBooking></AgendaBooking>
                        </Box>
                    }
                </form>
            </Box>

        );
    }
}


function mapStateToProps(state) {
    return {
        roomType: getValueAppPropertyStore(state, ROOM_TYPE),
        selectedDate: getValueAppPropertyStore(state, SELECTED_DATE),
        selectedTime: getValueAppPropertyStore(state, SELECTED_TIME),
        availableRooms: getValueAppPropertyStore(state, AVAILABLE_ROOMS),
        agendaEntries: getValueAppPropertyStore(state, AGENDA_ENTRIES)
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: "app",
    // TO REMOVE
    destroyOnUnmount: false,
    enableReinitialize: true,
})(BookRoomForm))
