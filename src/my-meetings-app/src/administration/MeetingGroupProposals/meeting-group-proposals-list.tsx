import React, { useEffect, useState } from 'react';
import { HttpClient } from '../../shared/http-client';

interface AdministrationMeetingGroupProposal {
    id: string,
    name: string,
    description: string,
    locationCity: string,
    locationCountryCode: string,
    proposalDate: Date,
    statusCode: string,
    decisionCode: string,
    decisionRejectReason: string
}

export function AdministrationMeetingGroupProposalsList() {

    const [meetingGroupProposals, setMeetingGroupProposals] = useState<Array<AdministrationMeetingGroupProposal>>([]);

    useEffect(() => {
        loadMeetingGroupProposals();
    }, []);

    function acceptProposal(meetingProposalId: string) {
        const url = `api/administration/meetingGroupProposals/${meetingProposalId}/accept`;
        
        HttpClient.patch(url, null);
    }

    function loadMeetingGroupProposals() {
        HttpClient.get<Array<AdministrationMeetingGroupProposal>>('api/administration/meetingGroupProposals')
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
                    <th>Decision</th>
                    <th>Reason of decision</th>
                </thead>
                
                {meetingGroupProposals.map(item =>  
                <tbody>
                <td>{item.name} </td>
                <td>{item.description} </td>
                <td>{item.locationCity} </td>
                <td>{item.locationCountryCode} </td>
                <td>{item.proposalDate} </td>
                <td>{item.statusCode} </td>
                <td>{item.decisionCode} </td>
                <td>{item.decisionRejectReason} </td>
                <td><button type="submit"  title="Accept" onClick={() => acceptProposal(item.id)}>Accept</button></td>
                </tbody>
                 )}
                
            </table>
        </div>
    )
}