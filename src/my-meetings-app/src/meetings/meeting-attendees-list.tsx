import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    useLocation,
    Link,
    useHistory
} from "react-router-dom";
import { AuthenticationService } from '../login/authentication/authentication-service';
import { HttpClient } from '../shared/http-client';

interface MeetingAttendee {
    firstName: string,
    lastName: string,
    attendeeId: string,
    roleCode: string,
    guestsNumber: string,
    decisionDate: string
}

interface AddMeetingAttendeeRequest {
    guestsNumber: number
}

export interface MeetingAttendeeListProperties {
    meetingId: string
}

export function MeetingAttendeesList(props: MeetingAttendeeListProperties) {

    const [meetingAttendees, setMeetingAttendees] = useState<Array<MeetingAttendee>>([]);

    useEffect(() => {
        loadMeetingAttendees();
    }, []);

    let history = useHistory();

    function loadMeetingAttendees() {
        HttpClient.get<Array<MeetingAttendee>>(`api/meetings/meetings/${props.meetingId}/attendees`)
            .then(response => setMeetingAttendees(response));
    }

    function isAuthenticatedUserAnAttendee(): boolean {
        const userId = AuthenticationService.getUserId();

        const meetingAttendee = meetingAttendees.find(x => x.attendeeId == userId);

        return meetingAttendee !== undefined;
    }

    function attendOnClick(): void {
        const data : AddMeetingAttendeeRequest = {
            guestsNumber: 0
        }
        
        HttpClient.post(`api/meetings/meetings/${props.meetingId}/attendees`, JSON.stringify(data))
        .then(() => loadMeetingAttendees());
    }

    function withdrawParticipationOnClick(): void {

    }

    return (
        <div>
            <table>
                <thead>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Role</th>
                    <th>Guests number</th>
                    <th>Decision date</th>
                </thead>

                {meetingAttendees.map(item =>
                    <tbody>
                        <td>{item.firstName} </td>
                        <td>{item.lastName} </td>
                        <td>{item.roleCode} </td>
                        <td>{item.guestsNumber} </td>
                        <td>{item.decisionDate} </td>
                    </tbody>
                )}

            </table>

            {!isAuthenticatedUserAnAttendee() &&
                <button onClick={() => attendOnClick()}>Attend</button>
            }

            {isAuthenticatedUserAnAttendee() &&
                <button onClick={() => withdrawParticipationOnClick()}>Withdraw participation</button>
            }
        </div>
    )
}