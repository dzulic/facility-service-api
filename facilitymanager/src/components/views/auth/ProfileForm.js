import React from "react";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "../../base/Loading";
import {Avatar} from "@mui/material";

const ProfileForm = () => {
    const {user, isAuthenticated, isLoading} = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <div>
                <Avatar sx={{margin: 'auto', height: '70px', width: '70px'}} alt={user.name}
                        src={user.picture}/>
                <h3>{user.given_name}</h3>
                <p>{user.email}</p>
                <p>{user.given_name}</p>
                <p>{user.family_name}</p>
                <p>{user.middle_name}</p>
                <p>{user.nickname}</p>
                <p>{user.profile}</p>
                <p>{user.email_verified}</p>
                <p>{user.phone_number}</p>
                <p>{user.updated_at}</p>
            </div>
        )
    );
};

export default withAuthenticationRequired(ProfileForm, {
    onRedirecting: () => <Loading/>,
});