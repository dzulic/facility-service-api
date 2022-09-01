import Box from "@mui/material/Box";
import React, {Component} from "react";
import {Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import {connect} from "react-redux";
import {AVAILABLE_ROOMS, CURRENT_USER_ENTRIES, getValueAppPropertyStore, ROOM_TYPE} from "../../utils/Utils";
import moment from "moment";

class CurrentUserBookingsComponent extends Component {

    generate = (element) => {
        const {currentUserEntries, availableRooms} = this.props
        if (currentUserEntries != null && availableRooms !== null) {
            return currentUserEntries.map((value) => {
                console.log(value)
                let room = availableRooms.filter((it) => it.id === value.roomId)[0]
                console.log("r", room)
                return React.cloneElement(element, {
                    key: value.id
                }, (
                    <><ListItemText sx={{fontSize: '0.1vw'}}
                                    primary={"Time of your booking:" + " " + moment(value.timeStart).format("HH:mm DD/MM/YYYY")}
                                    secondary={"At room:" + " " + room.roomId}
                    />
                        <ListItemAvatar>
                            <Avatar sx={{'backgroundColor': 'transparent'}}>
                                <CircleIcon fontSize="small" color="primary"/>
                            </Avatar>
                        </ListItemAvatar></>))
            })
        }
    }

    render() {
        return (<Box sx={{paddingTop: 5}}>
            <Typography variant='h6'>Your listings</Typography>
            <List>
                {this.generate(<ListItem
                    secondaryAction={<IconButton edge="end" aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>}>
                </ListItem>)}
            </List>
        </Box>)
    }
}

function

mapStateToProps(state) {
    return {
        currentUserEntries: getValueAppPropertyStore(state, CURRENT_USER_ENTRIES),
        availableRooms: getValueAppPropertyStore(state, AVAILABLE_ROOMS),
    };
}

export default connect(mapStateToProps)(CurrentUserBookingsComponent);
