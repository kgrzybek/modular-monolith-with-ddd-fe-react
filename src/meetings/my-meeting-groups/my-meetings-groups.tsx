import {
    Link
} from 'react-router-dom';
import { MyMeetingGroupProposalsList } from './my-meeting-group-proposals-list';
import { MyMeetingGroupsList } from './my-meeting-groups-list';
import React from 'react';

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