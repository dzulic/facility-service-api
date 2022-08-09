import React from 'react';
import './App.css';
import BookRoomComponent from './components/BookRoomComponent'
import HeaderComponent from "./components/base/HeaderComponent";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SidebarComponent from "./components/base/SidebarComponent";
import {Typography} from "@mui/material";

function App() {
    return (
        <div className="App">
            <Container aria-expanded={"true"} sx={{width: '100vw'}}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 2,
                        gridTemplateRows: 'auto',
                        gridTemplateAreas: `"header header header header"
                        "main main main sidebar"
                        "footer footer footer footer"`
                    }}>
                    <HeaderComponent></HeaderComponent>
                    <Box sx={{
                        gridArea: 'main', bgcolor: 'white',
                        display: 'flex', flexDirection: 'column', width: '100%', height: '100%',
                        boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)'
                    }}>
                        <BookRoomComponent></BookRoomComponent>
                    </Box>
                    <SidebarComponent></SidebarComponent>
                    <Box sx={{gridArea: 'footer', bgcolor: 'white'}}>
                        <Typography variant='p'>Julija Ciric, 2022</Typography>
                    </Box>
                </Box>
            </Container>
        </div>
    )
        ;
}

export default App;
