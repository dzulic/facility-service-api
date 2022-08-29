import React from "react";
import {connect} from "react-redux";
import AddTimelineItemModalComponent from "../custom/AddTimelineItemModalComponent";
import {ActionTypes} from "../../redux/actions";

class ModalDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    onClose = e => {
        console.log("ON CLOSE")
        const {dispatch} = this.props;
        dispatch({
            type: ActionTypes.CLOSE_MODAL,
            property: true
        });
    };

    // closeModalAndReload() {
    //     window.location.href = "/";
    // }

    render() {
        const {modalDialog} = this.props;
        const content =
            modalDialog.SHOW_MODAL_PROPERTY &&
            <AddTimelineItemModalComponent closeMethod={this.onClose} property={modalDialog.SHOW_MODAL_PROPERTY}/>
        return (
            <div>
                {content}
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