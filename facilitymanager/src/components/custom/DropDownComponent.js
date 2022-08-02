import {Box, FormControl, Input, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";

export default function DropDownComponent() {
    const [roomType, setValue] = React.useState();
    const handleChange = (event) => setValue(event.target.value);
    let options = [
        {label: 'interactive', value: 'Interactive'},
        {label: 'lecture', value: 'Lecture'},
        {label: 'combined', value: 'Combined'},
        {label: 'auditoria', value: 'Auditoria'}
    ];
    let itemList = options.map((item, index) => {
        return <MenuItem value={item.value} key={index}>{item.label}</MenuItem>
    })

    return (
        <Box sx={{padding: 5}}>
            <FormControl fullWidth={true}>
                <InputLabel id="demo-simple-select-label">Please select the type of the room</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={roomType}
                    label="Room Type"
                    onChange={handleChange}
                    input={<Input name="roomType" id="roomType"/>}

                >{itemList}</Select>
            </FormControl>
        </Box>
    )
}