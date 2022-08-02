import React from 'react';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {Box, FormControl, TextField} from "@mui/material";

export function DatePickerComponent() {
    const [value, setValue] = React.useState();
    const handleChange = (newValue) => {
        setValue(newValue);
    };
    let today = new Date(Date.now());

    return (
        <Box sx={{padding: 5}}>
            <FormControl fullWidth={true}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                        sx={{width: 'inherit'}}
                        label="Please select date to book a room"
                        inputFormat="MM/DD/yyyy"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    ></DesktopDatePicker>
                </LocalizationProvider>
            </FormControl>
        </Box>
    );
}

