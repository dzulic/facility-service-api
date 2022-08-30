import Box from "@mui/material/Box";
import React from "react";
import {Avatar, Typography} from "@mui/material";
import CurrentUserBookingsComponent from "../custom/CurrentUserBookingsComponent";
import LoginButton from "../views/auth/LoginButton";
import {useAuth0} from "@auth0/auth0-react";
import SignupButton from "../views/auth/SignupButton";
import Profile from "../views/auth/ProfileForm";

export function SidebarComponent() {
    const {isAuthenticated} = useAuth0();

    return (
        <Box sx={{gridArea: 'sidebar', bgcolor: '#e0e0e0', paddingTop: 5}}>
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
                    <Typography variant="p" component="p" mt={1} style={{color: '#1976d2'}}>Logged in user</Typography>
                    <Box sx={{paddingTop: 3}}>
                        <Profile/>
                    </Box>
                    <CurrentUserBookingsComponent></CurrentUserBookingsComponent>
                </>
            }
        </Box>
    );
}

export default SidebarComponent