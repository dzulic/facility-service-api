import Timeline, {DateHeader, SidebarHeader, TimelineHeaders} from 'react-calendar-timeline';
import moment from 'moment'
import React, {Component} from "react";
import Box from "@mui/material/Box";
import {CustomHeader} from "react-calendar-timeline/lib/lib/headers/CustomHeader";
import {AGENDA_ENTRIES, AVAILABLE_ROOMS, getValueAppPropertyStore, ROOM_TYPE} from "../../../utils/Utils";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import TodayMarker from "react-calendar-timeline/lib/lib/markers/public/TodayMarker";
import {ActionTypes} from "../../../redux/actions";

const defaultTime = moment()
    .startOf("day")
    .add(8, 'h')
const defaultTimeStart = defaultTime
    .toDate();
const defaultTimeEnd = defaultTime
    .add(13, "h")
    .toDate();

class BookRoomAgendaForm extends Component {

    createGroups = () => {
        const {availableRooms, roomType} = this.props
        let groups = []
        if (availableRooms !== null) {
            groups =
                availableRooms.filter(it => it.roomType === roomType).map((room) => {
                    return {id: room.id, title: room.roomId, height: 80}
                })
        }
        console.log("GROUPS", groups)
        return groups
    }

    createItems = () => {
        const {agendaEntries} = this.props
        let items = []
        console.log("ITEMS", agendaEntries)

        if (agendaEntries !== null) {
            items = agendaEntries.map((entry, index) => {
                return {
                    id: index,
                    group: entry.roomId,
                    title: entry.usePurposeDescription,
                    start_time: moment(entry.timeStart),
                    end_time: moment(entry.timeEnd).add(2, 'h')
                }
            })
        }
        console.log("ITEMS", items)
        return items
    }

    handleItemClick = (itemId, _, time) => {
        console.log('Clicked: ' + itemId, moment(time).format())
    }

    handleCanvasClick = (groupId, time, event) => {
        const {dispatch} = this.props
        dispatch({type: ActionTypes.SHOW_MODAL, property: {groupId: groupId, time: moment(time).format()}})
    }

    render() {
        return (<Box sx={{width: '40vw',margin:'auto'}}>

            <Timeline groups={this.createGroups()}
                      items={this.createItems()}
                      defaultTimeStart={defaultTimeStart}
                      defaultTimeEnd={defaultTimeEnd}
                      itemHeightRatio={0.75}
                      onItemDoubleClick={this.handleItemClick}
                      onCanvasClick={this.handleCanvasClick}>
                <TodayMarker/>
                <TimelineHeaders>
                    <SidebarHeader>
                        {({getRootProps}) => {
                            return <div {...getRootProps()}>Room Name</div>
                        }}
                    </SidebarHeader>
                    <DateHeader unit="primaryHeader"/>
                    <DateHeader/>
                    <CustomHeader
                        getLeftOffsetFromDate={(start) => start}
                        showPeriod={() => console.log("Show period")}
                        canvasWidth={50}
                        canvasTimeStart={10}
                        canvasTimeEnd={70}
                        visibleTimeStart={0}
                        visibleTimeEnd={0}
                        timeSteps={{
                            hour: 1
                        }}
                        height={80} headerData={{someData: 'data'}} unit="day">
                        {({
                              headerContext: {intervals}, getRootProps, getIntervalProps, showPeriod, data,
                          }) => {
                            return (<div {...getRootProps()}>
                                {intervals.map(interval => {
                                    const intervalStyle = {
                                        lineHeight: '30px',
                                        textAlign: 'center',
                                        borderLeft: '1px solid black',
                                        cursor: 'pointer',
                                        backgroundColor: 'Turquoise',
                                        color: 'white'
                                    }
                                    return (<div
                                        onClick={() => {
                                            showPeriod(interval.startTime, interval.endTime)
                                        }}
                                        {...getIntervalProps({
                                            interval, style: intervalStyle
                                        })}
                                    >
                                        <div className="sticky">
                                            {interval.startTime.format('YYYY')}
                                        </div>
                                    </div>)
                                })}
                            </div>)
                        }}
                    </CustomHeader>
                </TimelineHeaders>
            </Timeline>
        </Box>)
    }

}

function mapStateToProps(state) {
    return {
        roomType: getValueAppPropertyStore(state, ROOM_TYPE),
        agendaEntries: getValueAppPropertyStore(state, AGENDA_ENTRIES),
        availableRooms: getValueAppPropertyStore(state, AVAILABLE_ROOMS)
    };
}

export default connect(mapStateToProps)(reduxForm({
    form: "app",
    // TO REMOVE
    destroyOnUnmount: false,
    enableReinitialize: false,
})(BookRoomAgendaForm))


