import React from "react";
import {connect} from "react-redux";
import AddTimelineItemModalComponent from "../views/bookings/AddBookingModal";
import {ActionTypes} from "../../redux/actions";
import UpdateUserModal from "../views/auth/UpdateUserModal";
import ErrorModal from "./ErrorModal";
import BookingRemovalListingModal from "../views/bookings/BookingRemoveListingModal";

class ModalDialog extends React.Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this)
    }

    onClose() {
        const {dispatch} = this.props;
        dispatch({
            type: ActionTypes.CLOSE_MODAL,
            property: true
        });
    };

    render() {
        const {modalDialog} = this.props;
        const content =
            (modalDialog.SHOW_ADD_BOOKING_MODAL &&
                <AddTimelineItemModalComponent closeMethod={this.onClose} property={modalDialog.SHOW_MODAL_PROPERTY}/>)
            || (modalDialog.SHOW_UPDATE_USER_MODAL && <UpdateUserModal/>)
            || (modalDialog.SHOW_ERROR &&
                <ErrorModal closeMethod={this.onClose} property={modalDialog.SHOW_MODAL_PROPERTY}/>)
            || (modalDialog.SHOW_DELETE_MODAL && <BookingRemovalListingModal closeMethod={this.onClose} property={modalDialog.SHOW_MODAL_PROPERTY}/>)
        return (
            <div>
                {modalDialog.SHOW_MODAL_PROPERTY && content}
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        modalDialog: state.modalDialog,
    };
}

export default connect(mapStateToProps)(ModalDialog);