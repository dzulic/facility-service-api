import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@mui/material";

const SignupButton = () => {
    const {loginWithPopup} = useAuth0();

    return <Button
        sx={{'bgcolor': 'rgb(25, 118, 210)', 'color': 'white', 'width': '70%'}}
        onClick={() => loginWithPopup({screen_hint: 'signup', mode: 'signUp'})}>Sign Up</Button>;
};

export default SignupButton;