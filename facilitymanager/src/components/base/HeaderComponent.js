import Box from "@mui/material/Box";
import React from "react";
import FadeMenu from "./FadeMenuComponent";
import {Typography} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";

export function HeaderComponent() {
    const {user} = useAuth0();

    return (
        <>
            <Box sx={{
                marginTop: '1vw',
                padding: '2vw',
                gridArea: 'header', bgcolor: 'white',
                gridTemplateAreas: `"logo blank blank blank"`,
                gridTemplateColumns: 'repeat(4, 1fr)',
                flexDirection: 'row',
                gap: 10,
                boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)'
            }}>
                <Box sx={{gridArea: 'blank'}}>
                    <Typography variant="h2" component="h2" mt={1} style={{fontWeight: 600, color: '#1976d2'}}
                                fontFamily='"Caveat", cursive'>
                        BookARoom
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');
                        </style>
                    </Typography>
                </Box>
                <Box sx={{gridArea: 'blank'}}></Box>
                {user &&
                    <Box sx={{gridArea: 'blank'}}><FadeMenu></FadeMenu></Box>
                }
            </Box>
        </>
    );
}

export default HeaderComponent