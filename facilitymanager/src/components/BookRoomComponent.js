import React, {Component} from 'react';
import DatePickerComponent from './custom/DatePickerComponent';
import DayzComponent from './custom/DayzComponent';
import Box from '@mui/material/Box';
import DropDownComponent from "./custom/DropDownComponent";
import {connect} from "react-redux";
import {getFormValues, reduxForm} from "redux-form";
import {getValueAppPropertyStore, ROOM_TYPE, SELECTED_DATE, SELECTED_TIME} from "../utils/Utils";
import {Button} from "@mui/material";
import {ActionTypes} from "../redux/actions";

class BookRoomComponent extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        const {dispatch, roomType, selectedDate, selectedTime} = this.props;
        dispatch({
            type: ActionTypes.SUBMIT_GET_ROOMS,
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
                <form name="app">
                    <DropDownComponent></DropDownComponent>
                    {(this.props.roomType !== undefined && this.props.roomType != null) &&
                        <DatePickerComponent/>
                    }
                    {(this.props.roomType !== undefined && this.props.roomType != null && this.props.selectedDate != null) &&
                        <DayzComponent></DayzComponent>
                    }

                    {(this.props.roomType !== undefined && this.props.roomType != null && this.props.selectedDate != null) &&
                        <Button variant="contained" onClick={this.onSubmit}>SCHEDULE A ROOM</Button>
                    }
                </form>
            </Box>

        )
            ;
    }
}

const selector = getFormValues('app');

function mapStateToProps(state) {
    return {
        formName: 'app',
        formValues: selector(state),
        roomType: getValueAppPropertyStore(state, ROOM_TYPE),
        selectedDate: getValueAppPropertyStore(state, SELECTED_DATE),
        selectedTime: getValueAppPropertyStore(state, SELECTED_TIME),
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: "app",
    // TO REMOVE
    destroyOnUnmount: false,
    enableReinitialize: true,
})(BookRoomComponent))
