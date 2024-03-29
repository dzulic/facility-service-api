import React from "react";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "../../base/Loading";
import {Avatar, Typography} from "@mui/material";
import moment from "moment";

const ProfileForm = () => {
    const {user, isAuthenticated, isLoading} = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    console.log("USER",user);
    return (
        isAuthenticated && (
            <div>
                <Avatar sx={{margin: 'auto', height: '70px', width: '70px'}} alt={user.name}
                        src={user.picture}/>
                <Typography variant='h5'>{user.given_name} {user.family_name}</Typography>
                <Typography variant='h5'>{user.phone_number}</Typography>
            </div>
        )
    );
};

export default withAuthenticationRequired(ProfileForm, {
    onRedirecting: () => <Loading/>,
});