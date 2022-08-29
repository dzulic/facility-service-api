import React, {Component} from "react";
import {Box} from "@mui/system";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import moment from "moment";
import {ActionTypes} from "../../redux/actions";
import {getValueAppPropertyStore, SELECTED_DATE} from "../../utils/Utils";
import {connect} from "react-redux";

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

class AddTimelineItemModalComponent extends Component {

    submitBookRoom = () => {
        const {dispatch} = this.props
        dispatch({type: ActionTypes.SUBMIT_SCHEDULE_ROOM, property: {}})
    }

    render() {
        return (<Box sx={{width: '100vw'}}>
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
                    <DialogContentText>
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 2,
                            gridTemplateRows: 'auto',
                            gridTemplateAreas: `"text-field text-field"`
                        }}>
                            <TextField
                                value={this.props.property.time}
                                autoFocus
                                margin="dense"
                                id="start_time"
                                label="Start time"
                                type="time"
                                fullWidth
                                variant="standard"/>
                            <TextField
                                value={this.props.property.time}
                                autoFocus
                                margin="dense"
                                id="end_time"
                                label="End time"
                                type="time"
                                fullWidth
                                variant="standard"/>
                        </Box>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
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
        </Box>);
    }

}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(AddTimelineItemModalComponent)