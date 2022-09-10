import React from "react";
import ImageContent from "../custom/ImageContent";
import PageLayoutComponent from "../base/PageLayoutComponent";
import {useAuth0} from "@auth0/auth0-react";
import UpdateUserModal from "./auth/UpdateUserModal";
import BookRoomForm from "react-booking-facility-component/dist/lib/components/BookRoomForm"

export default function HomePage() {
    const {isAuthenticated, user} = useAuth0();

    if (isAuthenticated && (user != null && (user.finished_registration !== 'true'))) {
        return <UpdateUserModal/>
    }
    return (
        <PageLayoutComponent>
            {!isAuthenticated && <ImageContent/>}
            {isAuthenticated && <BookRoomForm/>}
        </PageLayoutComponent>
    );
}
