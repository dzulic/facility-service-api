import React, {Component} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import HeaderComponent from "../base/HeaderComponent";
import SidebarComponent from "../base/SidebarComponent";
import {Typography} from "@mui/material";

class PageLayoutComponent extends Component {
    render() {
        return (<Container aria-expanded={"true"}
                           sx={{maxWidth: '100%!important',
                               width: '100vw',
                               paddingLeft: '0!important',
                               paddingRight: '0!important'}}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 1,
                    gridTemplateRows: 'auto',
                    gridTemplateAreas: `"header header header sidebar"
                        "main main main sidebar"
                        "footer footer footer sidebar"`
                }}>
                <HeaderComponent></HeaderComponent>
                <Box sx={{
                    gridArea: 'main',
                    bgcolor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    minHeight: '80vh',
                    boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)'
                }}>
                    {this.props.children}
                </Box>
                <SidebarComponent></SidebarComponent>
                <Box sx={{gridArea: 'footer', bgcolor: 'white'}}>
                    <Typography variant='p'>Julija Ciric, 2022</Typography>
                </Box>
            </Box>
        </Container>);
    }
}

export default PageLayoutComponent