import React, {Component} from "react";
import {Box} from "@mui/system";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import moment from "moment";
import {connect} from "react-redux";
import {Field, getFormValues, reduxForm} from "redux-form";
import {ActionTypes} from "../actions";
import {renderTextField} from "./base/MuiTextFieldRendering";
import {withAuth0} from "@auth0/auth0-react";
import {getValueAppPropertyStore, ROOM_TYPE, SELECTED_DATE} from "../utils/Utils";

const formatDate = (date, time) => {
    return new Date(`${moment(date).format("yyyy-MM-DD")}T${time}:00.000+02:00`).toISOString()
}
const formName = 'bookRoomModule'

class AddBookingModal extends Component {
    constructor() {
        super();
        this.state = {
            selectedTimeStart: undefined
        };
        this.submitBookRoom = this.submitBookRoom.bind(this)
    }

    submitBookRoom = event => {
        const {dispatch, property, formValues, auth0, selectedDate, roomType} = this.props
        dispatch({
            type: ActionTypes.SUBMIT_SCHEDULE_ROOM,
            property: {
                roomId: property.groupId,
                description: formValues.description,
                selectedTimeStart: formatDate(property.time, formValues.selectedTimeStart),
                selectedTimeEnd: formatDate(property.time, formValues.selectedTimeEnd),
                accessToken: auth0.getAccessTokenSilently
            }
        })
        dispatch({
            type: ActionTypes.CLOSE_MODAL,
            property: true
        });
        dispatch({type: ActionTypes.GET_CURRENT_USER_BOOKINGS, property: {accessToken: auth0.getAccessTokenSilently}})
        dispatch({
            type: ActionTypes.GET_ROOMS_AND_AGENDAS,
            property: {
                roomType: roomType,
                selectedDate: selectedDate,
                computerPlacesMin: (formValues != null) ? formValues.computerPlaces : 0,
                sittingPlacesMin: (formValues != null) ? formValues.sittingPlaces : 0,
                accessToken: auth0.getAccessTokenSilently
            }
        })
    }

    render() {
        return (<form>
            <Box>
                <Dialog open={true} onClose={this.props.closeMethod}>
                    <DialogTitle>You can now book a room</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please check start and end time to reserve
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
                            <Typography>Select Time Start</Typography>
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
                            <Typography>Select Time End</Typography>
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
                        <Typography>What is the purpose of the booking</Typography>
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
        </form>);
    }

}

function mapStateToProps(state) {
    return {
        formName: formName,
        formValues: getFormValues(formName)(state),
        roomType: getValueAppPropertyStore(state, ROOM_TYPE),
        selectedDate: getValueAppPropertyStore(state, SELECTED_DATE),
    };
}

export default withAuth0(connect(mapStateToProps)(reduxForm({
    form: formName
})(AddBookingModal)));