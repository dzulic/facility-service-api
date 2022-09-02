import React, {Component} from "react";
import {Button, Grid, Typography} from "@mui/material";
import {Field, getFormValues, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {renderTextField} from "../../base/MuiTextFieldRendering";
import {withAuth0} from "@auth0/auth0-react";
import {ActionTypes} from "../../../redux/actions";
import PageLayoutComponent from "../../base/PageLayoutComponent";

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
            <PageLayoutComponent>
                <form className="form" style={{
                    'maxWidth': '330px',
                    'margin': '200px auto',
                    display: 'flex',
                    'flexDirection': 'column',
                    'background': 'white',
                    'marginTop': '30px'
                }} onSubmit={this.handleSubmit}>
                    <Typography component="h1" variant="h5" sx={{'padding': '20px'}}>
                        Please input more details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} sx={{'padding': '20px'}}>
                            <Typography component="p" variant="p">
                                Given name
                            </Typography>
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
                        <Grid item xs={12} sm={6} sx={{'padding': '20px'}}>
                            <Typography component="p" variant="p">
                                Family name
                            </Typography>
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
                        <Grid item xs={12} sx={{'padding': '20px'}}>
                            <Typography component="p" variant="p">
                                Phone number
                            </Typography>
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
                        type="submit"> SUBMIT
                    </Button>
                </form>
            </PageLayoutComponent>
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

