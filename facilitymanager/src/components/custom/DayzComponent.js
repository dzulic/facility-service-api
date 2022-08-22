import React from 'react';
import Dayz from 'dayz';
import "dayz/dist/dayz.css";
import moment from 'moment';
import Box from "@mui/material/Box";
import {getValueAppPropertyStore, SELECTED_DATE} from "../../utils/Utils";
import {connect} from "react-redux";

let COUNT = 1;

class DayzComponent extends React.Component {
    constructor(props) {
        super(props);
        this.addEvent = this.addEvent.bind(this);
        this.onEventClick = this.onEventClick.bind(this);
        this.editComponent = this.editComponent.bind(this);
        this.changeDisplay = this.changeDisplay.bind(this);
        this.onEventResize = this.onEventResize.bind(this);
        const date = moment(props.selectedDate, 'DD/MM/yyyy');
        this.state = {
            date,
            display: 'day',
            events: new Dayz.EventsCollection([

                {
                    content: '9am - 2pm (resizable)',
                    resizable: {step: 15},
                    range: moment.range(date.hour(9),
                        date.hour(14))
                },

                {
                    content: '8am - 8pm (non-resizable)',
                    range: moment.range(date.hour(8),
                        date.hour(21).minutes(40))
                },
            ]),
        };
    }

    changeDisplay(ev) {
        this.setState({display: ev.target.value});
    }

    onEventClick(ev, event) {
        event.set({editing: !event.isEditing()});
    }

    onEventResize(ev, event) {
        const start = event.start.format('hh:mma');
        const end = event.end.format('hh:mma');
        event.set({content: `${start} - ${end} (resizable)`});
    }

    addEvent(ev, date) {
        this.state.events.add({
            content: `Event ${COUNT++}`,
            resizable: true,
            range: moment.range(date.clone(), date.clone().add(1, 'hour').add(45, 'minutes')),
        });
    }

    editComponent(props) {
        const onBlur = function () {
            props.event.set({editing: false});
        };
        const onChange = function (ev) {
            props.event.set({content: ev.target.value});
        };
        const onDelete = function () {
            props.event.remove();
        };
        return (
            <div className="edit">
                <input
                    type="text" autoFocus
                    value={props.event.content}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <button onClick={onDelete}>X</button>
            </div>
        );
    }

    setDate = (ev) => {
        const dte = moment(ev.target.value);
        if (dte.isValid()) {
            this.setState({...this.state, date: moment(ev.target.value)});
        }
    }

    render() {
        return (
            <Box sx={{my: 4, flexGrow: 2}}>
                <Box sx={{height: '600px', margin: 'auto', width: '50%'}} className="dayz-test-wrapper">
                    <Dayz {...this.state}
                          display={'day'}
                          displayHours={[6, 22]}
                          highlightDays={[this.props.selectedDate]}
                          onEventResize={this.onEventResize}
                          editComponent={this.editComponent}
                          onDayDoubleClick={this.addEvent}
                          onEventClick={this.onEventClick}
                    ></Dayz>
                </Box>
            </Box>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedDate: getValueAppPropertyStore(state, SELECTED_DATE)
    };
}

export default connect(mapStateToProps)(DayzComponent)