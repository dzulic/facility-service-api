import Box from "@mui/material/Box";
import React from "react";
import {Typography} from "@mui/material";
import BookingsCurrentUserComponent from "../views/bookings/BookingsCurrentUserComponent";
import LoginButton from "../views/auth/LoginButton";
import {useAuth0} from "@auth0/auth0-react";
import SignupButton from "../views/auth/SignupButton";
import Profile from "../views/auth/ProfileForm";
import LogoutButton from "../views/auth/LogoutButton";

export function SidebarComponent() {
    const {isAuthenticated} = useAuth0();

    return (
        <>
            <Box sx={{gridArea: 'sidebar',paddingTop: '5vh'}}><LogoutButton/></Box>
            <Box sx={{gridArea: 'sidebar', bgcolor: '#010048', paddingTop: '20vh'}}>
                {!isAuthenticated && <>
                    <Box>
                        <Typography variant="p" component="p" mt={1}
                                    style={{'margin': 'auto', fontWeight: 200, color: '#1976d2'}}>Please login
                            to proceed </Typography>
                    </Box>
                    <Box sx={{'margin': 'auto', 'marginTop': '25px'}}>
                        <LoginButton/>
                    </Box>
                    <Box sx={{'margin': 'auto', 'marginTop': '25px'}}>
                        <Typography variant="p" component="p" mt={1}
                                    style={{'margin': 'auto', fontWeight: 200, color: '#1976d2'}}>OR</Typography>
                    </Box>
                    <Box sx={{'margin': 'auto', 'marginTop': '25px'}}>
                        <SignupButton/>
                    </Box>
                </>
                }
                {isAuthenticated &&
                    <>
                        <Typography variant="p" component="p" mt={1} style={{color: '#1976d2'}}>Logged in
                            user</Typography>
                        <Box sx={{paddingTop: 3}}>
                            <Profile/>
                        </Box>
                        <BookingsCurrentUserComponent></BookingsCurrentUserComponent>
                    </>
                }
            </Box>
        </>

    );
}

export default SidebarComponent