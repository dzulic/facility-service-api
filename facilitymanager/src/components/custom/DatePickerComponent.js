import React, {Component, useState} from 'react';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {Box, FormControl, TextField} from "@mui/material";
import {connect} from "react-redux";
import {ActionTypes} from "../../redux/actions";
import {getValueAppPropertyStore, SELECTED_DATE} from "../../utils/Utils";
import moment from "moment";

class DatePickerComponent extends Component {
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
                    value: date.format('DD/MM/YYYY')
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
                            value={this.props.selectedDate !== undefined ? moment(this.props.selectedDate, 'DD/MM/YYYY') : null}
                            disablePast
                            sx={{width: 'inherit'}}
                            label="Please select date to book a room"
                            inputFormat="DD/MM/yyyy"
                            format="dd / MM / yyyy"
                            onChange={this.handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        ></DesktopDatePicker>
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

export default connect(mapStateToProps)(DatePickerComponent)


