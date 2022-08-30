import React, {Component} from "react";
import {Grid, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import {Button} from "reactstrap";
import {Field, getFormValues, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {renderTextField} from "../../base/MuiTextFieldRendering";
import {withAuth0} from "@auth0/auth0-react";
import {ActionTypes} from "../../../redux/actions";

class UpdateUserModal extends Component {

    handleSubmit = async (event) => {
        event.preventDefault()
        const {dispatch, formValues} = this.props
        const {user, getAccessTokenSilently} = this.props.auth0;
        dispatch({
            type: ActionTypes.UPDATE_USER_INFO,
            property: {userId: user.sub, body: formValues, accessToken: getAccessTokenSilently}
        })
    }

    render() {
        return (
            <Container aria-expanded={"true"} sx={{width: '100vw'}}>
                <form className="form" style={{
                    'max-width': '330px',
                    'margin': '0 auto',
                    display: 'flex',
                    'flex-direction': 'column',
                    'background': 'white',
                    'padding': '20px',
                    'marginTop': '30px'
                }} onSubmit={this.handleSubmit}>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={renderTextField}
                                autoComplete="fname"
                                name="given_name"
                                variant="outlined"
                                required
                                fullWidth
                                id="given_name"
                                label="Given Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={renderTextField}
                                variant="outlined"
                                required
                                fullWidth
                                id="family_name"
                                label="Family Name"
                                name="family_name"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={renderTextField}
                                variant="outlined"
                                required
                                fullWidth
                                id="nickname"
                                label="Nickname"
                                name="nickname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={renderTextField}
                                variant="outlined"
                                required
                                fullWidth
                                name="phone_number"
                                label="Phone number"
                                autoComplete="tel"
                                id="phone_number"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign Up
                    </Button>
                </form>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        formName: 'updateUserForm', formValues: getFormValues('updateUserForm')(state)
    };
}

export default withAuth0(connect(mapStateToProps)(reduxForm({
    form: 'updateUserForm'
})(UpdateUserModal)));

