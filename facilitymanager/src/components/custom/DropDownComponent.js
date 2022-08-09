import {Box, FormControl, Input, InputLabel, MenuItem, Select} from "@mui/material";
import React, {Component} from "react";
import {ActionTypes} from '../../redux/actions';
import {connect} from "react-redux";
import {Field} from 'redux-form'
import {ROOM_TYPE} from "../../utils/Utils";

let options = [
    {label: '', value: undefined},
    {label: 'Interactive', value: 'interactive'},
    {label: 'Lecture', value: 'lecture'},
    {label: 'Combined', value: 'combined'},
    {label: 'Auditoria', value: 'auditoria'}
];
let itemList = options.map((item, index) => {
    return <MenuItem value={item.value} key={index}>{item.label}</MenuItem>
})
const renderSelectField = ({
                               ...custom
                           }) => (
    <FormControl fullWidth={true}>
        <InputLabel id="demo-simple-select-label">Please select the type of the room</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Room Type"
            onChange={custom['other']}
            input={<Input name="roomType" id="roomType" defaultValue=''/>}
        >{itemList}</Select>
    </FormControl>
)

class DropDownComponent extends Component {
    handleChange = (event) => {
        if (event !== undefined) {
            const {dispatch} = this.props
            dispatch({
                type: ActionTypes.ADD_EDIT_APP_PROPERTY,
                property: {
                    key: ROOM_TYPE,
                    value: event.target.value
                }
            })
        }
    }


    render() {
        return (
            <Box sx={{padding: 5}}>
                <Field
                    name="favoriteColor"
                    component={renderSelectField}
                    label="Favorite Color"
                    other={this.handleChange}
                >
                </Field>
            </Box>
        )
    }
}

export default connect()(DropDownComponent)
