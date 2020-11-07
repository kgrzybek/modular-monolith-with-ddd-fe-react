import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { MyMeetingGroupProposalsList } from './my-meeting-group-proposals-list';
import { MyMeetingGroupsList } from './my-meeting-groups-list';

export function MyMeetingsGroups() {

    return (
        <div className="container">
            <Link to="/meeting-groups-create">Create new group</Link>

            <div>
                <MyMeetingGroupProposalsList />
            </div>
            <div>
                <MyMeetingGroupsList />
            </div>
        </div>
    )
}