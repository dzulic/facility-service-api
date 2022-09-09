import Box from "@mui/material/Box";
import React from "react";
import {Typography} from "@mui/material";

export function HeaderComponent() {
    return (
        <>
            <Box sx={{
                padding: '2vw',
                display: 'grid',
                gridArea: 'header', bgcolor: 'white',
                gridTemplateAreas: `"blank blank"`,
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridTemplateRows: 'auto',
                gap: 5,
                boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)'
            }}>
                <Typography variant="h2" component="h2" mt={1}
                            style={{
                                gridArea: 'blank',
                                textAlign: 'left',
                                fontWeight: 500,
                                color: '#1976d2',
                            }}
                            fontFamily='"Caveat", cursive'>
                    BookARoom
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');
                    </style>
                </Typography>
            </Box>
        </>
    );
}

export default HeaderComponent