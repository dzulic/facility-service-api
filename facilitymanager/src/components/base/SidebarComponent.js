import Box from "@mui/material/Box";
import React from "react";
import {Avatar, Typography} from "@mui/material";
import CurrentUserBookingsComponent from "../custom/CurrentUserBookingsComponent";

export function SidebarComponent() {
    return (
        <Box sx={{gridArea: 'sidebar', bgcolor: '#e0e0e0', paddingTop: 5}}>
            <Avatar sx={{margin: 'auto', height: '70px', width: '70px'}} alt="Julija Ciric" src="./avatar1.jpg"/>
            <Typography variant="p" component="p" mt={1} style={{color: '#1976d2'}}>Logged in user</Typography>
            <Box sx={{paddingTop: 3}}>
                <Typography variant="p" component="p" mt={1}
                            style={{paddingTop: 5, textAlign: 'justify'}}>Some
                    additional data about user. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Vel facilisis volutpat est velit egestas dui id
                    ornare. Metus aliquam eleifend mi in. In hendrerit gravida rutrum quisque non tellus. Risus commodo
                    viverra maecenas accumsan. </Typography>
            </Box>
            <CurrentUserBookingsComponent></CurrentUserBookingsComponent>
        </Box>
    );
}

export default SidebarComponent