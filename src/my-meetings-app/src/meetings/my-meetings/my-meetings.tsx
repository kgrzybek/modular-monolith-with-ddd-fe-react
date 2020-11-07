import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    useLocation,
    Link,
    useHistory
} from "react-router-dom";
import { HttpClient } from '../../shared/http-client';

interface MemberMeeting {
    meetingId: string,
    title: string,
    locationAddress: string,
    locationCity: Date,
    locationPostalCode: Date,
    termStartDate: string,
    termEndDate: string,
    roleCode: string
}

export function MyMeetings() {

    const [meetings, setMeetings] = useState<Array<MemberMeeting>>([]);

    useEffect(() => {
        loadMeetings();
    }, []);

    let history = useHistory();

    function loadMeetings() {
        HttpClient.get<Array<MemberMeeting>>('api/meetings/meetings')
            .then(response => setMeetings(response));
    }

    function onClick(meetingId: string) {
        history.push(`/meetings/${meetingId}`);
    }

    return (
        <div>
            <table>
                <thead>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Term</th>
                    <th>Role</th>
                    <th></th>
                </thead>
                
                {meetings.map(item =>  
                <tbody>
                <td>{item.title} </td>
                <td>{item.locationAddress}, {item.locationCity}</td>
                <td>{item.termStartDate} -  {item.termEndDate}</td>
                <td>{item.roleCode} </td>
                <td><button onClick={() => onClick(item.meetingId)}>Go to meeting</button></td>
                </tbody>
                 )}
                
            </table>
        </div>
    )
}