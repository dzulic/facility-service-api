import React, {Component} from 'react';
import DatePickerComponent from './custom/DatePickerComponent';
import DayzComponent from './custom/DayzComponent';
import Box from '@mui/material/Box';
import DropDownComponent from "./custom/DropDownComponent";
import {connect} from "react-redux";
import {getFormValues, reduxForm} from "redux-form";
import {getValueAppPropertyStore, ROOM_TYPE, SELECTED_DATE} from "../utils/Utils";

class BookRoomComponent extends Component {
    render() {
        return (
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    gap: 3,
                    gridTemplateRows: 'auto'
                }}>
                <form onSubmit={console.log("ON SUBMIT")}>

                    <DropDownComponent></DropDownComponent>
                    {(this.props.roomType !== undefined && this.props.roomType != null) &&
                        <Box sx={{my: 4}}>
                            <DatePickerComponent/>
                        </Box>
                    }
                    {(this.props.roomType !== undefined && this.props.roomType != null && this.props.date != null) &&
                        <Box sx={{my: 4, flexGrow: 2}}>
                            <DayzComponent></DayzComponent>
                        </Box>
                    }
                </form>
            </Box>

        );
    }
}

const selector = getFormValues('app');

function mapStateToProps(state) {
    return {
        formName: 'app',
        formValues: selector(state),
        roomType: getValueAppPropertyStore(state, ROOM_TYPE),
        date: getValueAppPropertyStore(state, SELECTED_DATE),
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: "app"
})(BookRoomComponent))
