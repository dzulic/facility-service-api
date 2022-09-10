import {TextField} from "@mui/material";
import React from "react";

export const renderTextField = ({input, label, meta: {touched, error}, ...custom}) => {
    return <TextField
        value={input.value}
        // errorText={touched && error}
        {...input}
        {...custom}
    />
}
