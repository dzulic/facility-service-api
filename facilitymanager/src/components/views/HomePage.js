import React from "react";
import Container from "@mui/material/Container";
import ImageContent from "../custom/ImageContent";
import PageLayoutComponent from "../base/PageLayoutComponent";
import BookRoomForm from "./bookings/BookRoomForm";
import {useAuth0} from "@auth0/auth0-react";
import UpdateUserModal from "./auth/UpdateUserModal";


export default function HomePage() {
    const {isAuthenticated, user} = useAuth0();

    if (isAuthenticated && (user != null && (user.finished_registration !== 'true'))) {
        return <UpdateUserModal/>
    }
    return (<Container aria-expanded={"true"}>
        <PageLayoutComponent>
            {!isAuthenticated && <ImageContent/>}
            {isAuthenticated && <BookRoomForm/>}
        </PageLayoutComponent>
    </Container>);
}
