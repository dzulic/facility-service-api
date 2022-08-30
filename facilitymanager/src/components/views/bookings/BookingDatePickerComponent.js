import React, {Component} from 'react';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider, DesktopDatePicker} from "@mui/x-date-pickers";
import {Box, FormControl, TextField} from "@mui/material";
import {connect} from "react-redux";
import {ActionTypes} from "../../../redux/actions";
import {getValueAppPropertyStore, SELECTED_DATE} from "../../../utils/Utils";
import moment from "moment";

const DATE_FORMAT = 'YYYY-MM-DDTHH:mm:00.000+02:00';

class BookingDatePickerComponent extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (date) => {
        if (date !== undefined) {
            const {dispatch} = this.props
            dispatch({
                type: ActionTypes.ADD_EDIT_APP_PROPERTY,
                property: {
                    key: SELECTED_DATE,
                    value: date.format(DATE_FORMAT)
                }
            })
        }
    }

    render() {
        console.log("DATE IS", this.props.selectedDate)
        return (
            <Box sx={{padding: 5, my: 4}}>
                <FormControl fullWidth={true}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                            componentsProps={{
                                actionBar: {
                                    actions: []
                                }
                            }}
                            minutesStep={15}
                            displayStaticWrapperAs="mobile"
                            disablePast
                            format="dd / MM / yyyy"
                            inputFormat="DD/MM/yyyy"
                            toolbarTitle='Please select date and time to book a room'
                            openTo="day"
                            sx={{width: '100%'}}
                            ampm={false}
                            value={this.props.selectedDate !== undefined ? moment(this.props.selectedDate, DATE_FORMAT) : null}
                            onChange={(newValue) => {
                                this.handleChange(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </FormControl>
            </Box>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedDate: getValueAppPropertyStore(state, SELECTED_DATE)
    };
}

export default connect(mapStateToProps)(BookingDatePickerComponent)

