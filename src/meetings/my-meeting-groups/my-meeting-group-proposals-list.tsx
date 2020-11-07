import React, { useEffect, useState } from 'react';
import { HttpClient } from '../../shared/http-client';

interface MeetingGroupProposal {
    id: string,
    name: string,
    description: string,
    locationCity: string,
    locationCountryCode: string,
    proposalDate: Date,
    statusCode: string
}

export function MyMeetingGroupProposalsList() {

    const [meetingGroupProposals, setMeetingGroupProposals] = useState<Array<MeetingGroupProposal>>([]);

    useEffect(() => {
        loadMeetingGroupProposals();
    }, []);

    function loadMeetingGroupProposals() {
        HttpClient.get<Array<MeetingGroupProposal>>('api/meetings/meetingGroupProposals')
            .then(response => setMeetingGroupProposals(response));
    }

    return (
        <div>
            <table>
                <thead>
                    <th>Name</th>
                    <th>Description</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Date</th>
                    <th>Status</th>
                </thead>
                
                {meetingGroupProposals.map(item =>  
                <tbody>
                <td>{item.name} </td>
                <td>{item.description} </td>
                <td>{item.locationCity} </td>
                <td>{item.locationCountryCode} </td>
                <td>{item.proposalDate} </td>
                <td>{item.statusCode} </td>
                </tbody>
                 )}
                
            </table>
        </div>
    )
}