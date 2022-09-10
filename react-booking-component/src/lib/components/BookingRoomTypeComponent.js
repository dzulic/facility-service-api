import {FormControl, Input, InputLabel, MenuItem, Select} from "@mui/material";
import React, {Component} from "react";
import {ActionTypes} from '../actions';
import {connect} from "react-redux";
import {Field} from 'redux-form'
import {ROOM_TYPE} from "../utils/Utils";

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
        <InputLabel id="demo-simple-select-label">Select the type of the room</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Room Type"
            onChange={custom['other']}
            input={<Input name="roomType" id="roomType" defaultValue={undefined}/>}
        >{itemList}</Select>
    </FormControl>
)

class BookingRoomTypeComponent extends Component {
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
            <>
                <Field
                    name="favoriteColor"
                    component={renderSelectField}
                    label="Favorite Color"
                    other={this.handleChange}
                >
                </Field>
            </>
        )
    }
}

export default connect()(BookingRoomTypeComponent)
