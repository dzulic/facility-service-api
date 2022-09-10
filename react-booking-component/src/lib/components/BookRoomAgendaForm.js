import Timeline, {DateHeader, SidebarHeader, TimelineHeaders} from 'react-calendar-timeline';
import moment from 'moment'
import React, {Component} from "react";
import Box from "@mui/material/Box";
import {CustomHeader} from "react-calendar-timeline/lib/lib/headers/CustomHeader";
import {AGENDA_ENTRIES, ALL_ROOMS, AVAILABLE_ROOMS, getValueAppPropertyStore, ROOM_TYPE} from "../utils/Utils";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import TodayMarker from "react-calendar-timeline/lib/lib/markers/public/TodayMarker";
import {ActionTypes} from "../actions";

const defaultTime = moment()
    .startOf("hour")
const defaultTimeStart = defaultTime
    .toDate();
const defaultTimeEnd = defaultTime
    .add(13, "h")
    .toDate();

class BookRoomAgendaForm extends Component {

    createGroups = () => {
        const {allRooms, availableRooms, roomType} = this.props
        let groups = []
        if (allRooms !== null) {
            groups = allRooms.filter(it => it.roomType === roomType)
                .filter(all => availableRooms
                    .includes(all.id)).map((room) => {
                    return {
                        id: room.id,
                        title: room.roomId,
                        height: 80,
                        rightTitle: `${room.computerPlaces}cp / ${room.sittingPlaces}sp`
                    }
                })
        }
        console.log(allRooms)

        if (groups.length === 0 && allRooms != null) {
            return allRooms.map((room) => {
                return {
                    id: room.id, title:
                        `${room.roomId} / ${room.roomType} 
                  `, height: 80, rightTitle: `${room.computerPlaces}cp / ${room.sittingPlaces}sp`
                }
            })
        }
        return groups
    }

    createItems = () => {
        const {agendaEntries} = this.props
        let items = []
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
        return items
    }

    handleItemClick = (itemId, _, time) => {
        const {dispatch} = this.props
        dispatch({
            type: ActionTypes.SHOW_DELETE_MODAL,
            property: {
                value: itemId
            }
        })  }

    handleCanvasClick = (groupId, time) => {
        const {dispatch} = this.props
        dispatch({type: ActionTypes.SHOW_MODAL, property: {groupId: groupId, time: moment(time).format()}})
    }

    render() {
        return (<Box sx={{width: '100%', margin: 'auto'}}>
            <Timeline groups={this.createGroups()}
                      items={this.createItems()}
                      defaultTimeStart={defaultTimeStart}
                      defaultTimeEnd={defaultTimeEnd}
                      itemHeightRatio={0.75}
                      onItemClick={this.handleItemClick}
                      onCanvasClick={this.handleCanvasClick}
                      rightSidebarWidth={150}
                      buffer={1.2}>
                <TodayMarker/>
                <TimelineHeaders>
                    <SidebarHeader>
                        {({getRootProps}) => {
                            return <div className="rct-sidebar-title-text" {...getRootProps()}>Room id/Room type</div>
                        }}
                    </SidebarHeader>
                    <DateHeader unit="primaryHeader"/>
                    <DateHeader/>
                    <CustomHeader
                        getLeftOffsetFromDate={(start) => start}
                        showPeriod={() => console.log("Show period")}
                        canvasWidth={50}
                        canvasTimeStart={8}
                        canvasTimeEnd={20}
                        visibleTimeStart={8}
                        visibleTimeEnd={20}
                        timeSteps={{
                            hour: 1
                        }}
                        height={80} headerData={{someData: 'data'}} unit="day">
                        {({
                              headerContext: {intervals}, getRootProps, getIntervalProps, showPeriod,
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
        availableRooms: getValueAppPropertyStore(state, AVAILABLE_ROOMS),
        allRooms: getValueAppPropertyStore(state, ALL_ROOMS)
    };
}

export default connect(mapStateToProps)(reduxForm({
    form: "app", // TO REMOVE
    destroyOnUnmount: false, enableReinitialize: false,
})(BookRoomAgendaForm))


