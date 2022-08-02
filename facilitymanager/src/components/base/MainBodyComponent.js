import React from 'react';
import {DatePickerComponent} from '../custom/DatePickerComponent';
import DayzTestComponent from '../custom/DayzTestComponent';
import Box from '@mui/material/Box';
import DropDownComponent from "../custom/DropDownComponent";

function MainBodyComponent() {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(1, 1fr)',
                gap: 3,
                gridTemplateRows: 'auto'
            }}>
                <DropDownComponent></DropDownComponent>
                <Box sx={{my: 4}}>
                    <DatePickerComponent/>
                </Box>
                <Box sx={{my: 4, flexGrow: 2}}>
                    <DayzTestComponent></DayzTestComponent>
                </Box>
        </Box>

    )
        ;
}

export default MainBodyComponent;
