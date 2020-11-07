import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    useLocation,
    Link,
    useParams,
    useHistory
} from "react-router-dom";
import { HttpClient } from '../shared/http-client';
import { MeetingAttendeeListProperties, MeetingAttendeesList } from './meeting-attendees-list';

interface MeetingDetails {
    id: string,
    meetingGroupId: string,
    title: string,
    termStartDate: Date,
    termEndDate: Date,
    description: string,
    locationName: string,
    locationAddress: string,
    locationPostalCode: string,
    locationCity: string,
    attendeesLimit?: number,
    guestsLimit: number,
    rsvpTermStartDate?: string,
    rsvpTermEndDate?: string,
    eventFeeValue?: string,
    eventFeeCurrency: string
}

interface MeetingDetailsUrlParams {
    meetingId: string;
  }

export function MeetingDetails() {
    const { meetingId } = useParams<MeetingDetailsUrlParams>();

    const [meetingDetails, setMeetingDetails] = useState<MeetingDetails | null>(null);

    useEffect(() => {
        loadDetails();
    }, []);

    let history = useHistory();

    function loadDetails() {
        HttpClient.get<MeetingDetails>(`api/meetings/meetings/${meetingId}`)
            .then(response => setMeetingDetails(response));
    }

    function getMeetingAttendeesListProperties() : MeetingAttendeeListProperties {
        return {
            meetingId: meetingId
        }
    }

    return (
        <div>
            {meetingDetails !== null &&
                <div>
                    <div>ID: {meetingDetails.id} </div>
                    <div>Title: {meetingDetails.title} </div>
                    <div>Date: {meetingDetails.termStartDate} - {meetingDetails.termEndDate} </div>
                    <div>Description: {meetingDetails.description} </div>
                    <div>Location name: {meetingDetails.locationName} </div>
                    <div>Location address: {meetingDetails.locationAddress} </div>
                    <div>Postal code: {meetingDetails.locationPostalCode} </div>
                    <div>City: {meetingDetails.locationCity} </div>
                    <div>Attendees limit: {meetingDetails.attendeesLimit} </div>
                    <div>Guests limit: {meetingDetails.guestsLimit} </div>
                    <div>RSVP start date: {meetingDetails.rsvpTermStartDate} - {meetingDetails.rsvpTermEndDate} </div>
                    <div>Fee: {meetingDetails.eventFeeValue} {meetingDetails.eventFeeCurrency} </div>
                </div>
            }

            <MeetingAttendeesList {...getMeetingAttendeesListProperties()}></MeetingAttendeesList>
        </div>
    )
}