import React, {Component} from "react";
import Container from "@mui/material/Container";
import BookRoomComponent from "./BookRoomComponent";
import PageLayoutComponent from "../base/PageLayoutComponent";

class HomeComponent extends Component {

    render() {
        return (
            <Container aria-expanded={"true"} sx={{width: '100vw'}}>
                <PageLayoutComponent>
                    <BookRoomComponent></BookRoomComponent>
                </PageLayoutComponent>
            </Container>);
    }
}

export default HomeComponent