import Box from "@mui/material/Box";
import React, {Component} from "react";
import {IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {connect} from "react-redux";
import {ALL_ROOMS, CURRENT_USER_ENTRIES, getValueAppPropertyStore} from "../utils/Utils";
import moment from "moment";
import {ActionTypes} from "../actions";
import {withAuth0} from "@auth0/auth0-react";

class BookingsCurrentUserComponent extends Component {

    generate = (element) => {
        const {currentUserEntries, availableRooms} = this.props
        if (currentUserEntries != null && availableRooms !== null) {
            console.log(currentUserEntries)
            return currentUserEntries.map((value) => {
                let room = availableRooms.filter((it) => it.id === value.roomId)[0]
                return React.cloneElement(element, {
                    key: value.id
                }, (
                    <><ListItemText sx={{fontSize: '0.1vw'}}
                                    primary={`Time of your booking: ${moment(value.timeStart).format("HH:mm DD/MM/YYYY")}
                                        At ${room.roomId} with purpose ${value.usePurposeDescription}`}
                    />
                        <ListItemAvatar>
                        </ListItemAvatar>
                        <IconButton edge="end" aria-label="delete" sx={{color: 'white'}} key={value.id}
                                    onClick={() => this.handleDelete(value.id)}>
                            <DeleteIcon/>
                        </IconButton></>))
            })
        }
    }

    handleDelete = (id) => {
        const {dispatch} = this.props
        dispatch({
            type: ActionTypes.SHOW_DELETE_MODAL,
            property: {
                value: id
            }
        })
    }

    render() {
        return (<Box sx={{paddingTop: 5}}>
            <Typography variant='h6'>Your listings</Typography>
            <List>
                {this.generate(
                    <ListItem>
                    </ListItem>)}
            </List>
        </Box>)
    }
}

function

mapStateToProps(state) {
    return {
        currentUserEntries: getValueAppPropertyStore(state, CURRENT_USER_ENTRIES),
        availableRooms: getValueAppPropertyStore(state, ALL_ROOMS),
    };
}

export default withAuth0(connect(mapStateToProps)(BookingsCurrentUserComponent))
