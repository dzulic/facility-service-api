import React, {Component} from "react";
import Container from "@mui/material/Container";
import PageLayoutComponent from "../base/PageLayoutComponent";
import Box from "@mui/material/Box";
import DayComponent from "../custom/DayComponent";
import ModalDialog from "../base/ModalDialog";

class RoomOverviewComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container aria-expanded={"true"} sx={{width: '100vw'}}>
                <ModalDialog/>
                <PageLayoutComponent>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(1, 1fr)',
                            gridTemplateRows: 'auto'
                        }}>
                        <form name="app">
                            <DayComponent></DayComponent>
                        </form>
                    </Box>
                </PageLayoutComponent>
            </Container>
        )
    }
}


export default RoomOverviewComponent