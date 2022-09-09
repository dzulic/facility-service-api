import React, {Component} from "react";
import {Box} from "@mui/system";
import {Button, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {connect} from "react-redux";
import {withAuth0} from "@auth0/auth0-react";

class ErrorModal extends Component {
    constructor() {
        super();
    }

    render() {
        return (<Box>
                <Dialog open={true} onClose={this.props.closeMethod}>
                    <Alert severity="error">Something went wrong</Alert>
                    <DialogTitle>Please refresh the page</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeMethod}>Close modal</Button>
                    </DialogActions>
                </Dialog>
            </Box>);
    }

}

function mapStateToProps(state) {
    return {};
}

export default withAuth0(connect(mapStateToProps)(ErrorModal));