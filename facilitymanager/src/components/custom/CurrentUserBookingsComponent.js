import Box from "@mui/material/Box";
import React from "react";
import {Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';

function CurrentUserBookingsComponent() {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    function generate(element) {
        return [0, 1, 2].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }

    return (<Box sx={{paddingTop: 5}}>
        <Typography variant='h6'>Your listings</Typography>
        <List dense={dense}>
            {generate(
                <ListItem
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    }
                >
                    <ListItemAvatar>
                        <Avatar sx={{'backgroundColor': 'transparent'}}>
                            <CircleIcon fontSize="small" color="primary"/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText sx={{fontSize: '0.1vw'}}
                                  primary="Single-line item"
                                  secondary={secondary ? 'Secondary text' : null}
                    />
                </ListItem>
            )}
        </List>
    </Box>)
}

export default CurrentUserBookingsComponent