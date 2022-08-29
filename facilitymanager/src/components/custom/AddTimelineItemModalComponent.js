import React, {Component} from "react";
import {Box} from "@mui/system";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import moment from "moment";
import {connect} from "react-redux";
import {Field, Form, getFormValues, reduxForm} from "redux-form";
import {ActionTypes} from "../../redux/actions";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const renderTextField = ({
                             input, label, meta: {touched, error}, ...custom
                         }) => {
    return <TextField
        value={input.value}
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />

}

const formatDate = (date, time) => {
    return new Date(`${moment(date).format("yyyy-MM-DD")}T${time}:00.000+02:00`).toISOString()
}

class AddTimelineItemModalComponent extends Component {
    constructor() {
        super();
        this.state = {
            selectedTimeStart: undefined
        };
        this.submitBookRoom = this.submitBookRoom.bind(this)
    }

    submitBookRoom = event => {
        event.preventDefault();
        const {dispatch, property, formValues} = this.props
        dispatch({
            type: ActionTypes.SUBMIT_SCHEDULE_ROOM, property: {
                roomId: property.groupId,
                description: formValues.description,
                selectedTimeStart: formatDate(property.time, formValues.selectedTimeStart),
                selectedTimeEnd: formatDate(property.time, formValues.selectedTimeEnd)
            }
        })
    }

    render() {
        return (<Form>
            <Box sx={{width: '100vw'}}>
                <Button variant="outlined" onClick={this.props.closeMethod}>
                    Open form dialog
                </Button>
                <Dialog open={true} onClose={this.props.closeMethod}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <DialogContentText>
                            {moment(this.props.property.time).format("DD/MM/YYYY HH:mm")}
                        </DialogContentText>
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 2,
                            gridTemplateRows: 'auto',
                            gridTemplateAreas: `"text-field text-field"`
                        }}>
                            <Field
                                name="selectedTimeStart"
                                component={renderTextField}
                                label="Select Time Start"
                                autoFocus
                                margin="dense"
                                id="selectedTimeStart"
                                type="time"
                                fullWidth
                                variant="standard"
                            />
                            <Field
                                name="selectedTimeEnd"
                                component={renderTextField}
                                label="Select Time End"
                                autoFocus
                                margin="dense"
                                id="selectedTimeEnd"
                                type="time"
                                fullWidth
                                variant="standard"
                            />
                        </Box>
                        <Field
                            name="description"
                            component={renderTextField}
                            label="Description"
                            autoFocus
                            margin="dense"
                            id="description"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeMethod}>Cancel</Button>
                        <Button onClick={this.submitBookRoom}>Book a room</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Form>);
    }

}

function mapStateToProps(state) {
    return {
        formName: 'bookRoomModule', formValues: getFormValues('bookRoomModule')(state)
    };
}

export default connect(mapStateToProps)(reduxForm({
    form: 'bookRoomModule'
})(AddTimelineItemModalComponent));