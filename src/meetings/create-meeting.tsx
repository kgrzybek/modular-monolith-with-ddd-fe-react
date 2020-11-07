import { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    useParams
} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HttpClient } from '../shared/http-client';

interface CreateMeetingRequest {
    meetingGroupId: string,
    title: string,
    termStartDate: Date,
    termEndDate: Date,
    description: string,
    meetingLocationName: string,
    meetingLocationAddress: string,
    meetingLocationPostalCode: string,
    meetingLocationCity: string,
    attendeesLimit?: number,
    guestsLimit: number,
    rsvpTermStartDate?: Date,
    rsvpTermEndDate?: Date,
    eventFeeValue?: number,
    eventFeeCurrency: string,
    hostMemberIds: string[]
}

interface CreateMeetingUrlParams {
    meetingGroupId: string;
  }

export function CreateMeeting() {

    const { meetingGroupId } = useParams<CreateMeetingUrlParams>();

    const [title, setTitle] = useState('');
    const [termStartDate, setTermStartDate] = useState<any>(new Date());
    const [termEndDate, setTermEndDate] = useState<any>(new Date());
    const [description, setDescription] = useState('');
    const [meetingLocationName, setMeetingLocationName] = useState('');
    const [meetingLocationAddress, setMeetingLocationAddress] = useState('');
    const [meetingLocationPostalCode, setMeetingLocationPostalCode] = useState('');
    const [meetingLocationCity, setMeetingLocationCity] = useState('');
    const [attendeesLimit, setAttendeesLimit] = useState<number | undefined>();
    const [guestsLimit, setGuestsLimit] = useState<number>(0);
    const [RSVPTermStartDate, setRSVPTermStartDate] = useState<any>(new Date());
    const [rsvpTermEndDate, setRSVPTermEndDate] = useState<any>(new Date());
    const [eventFeeValue, setEventFeeValue] = useState<number | undefined>();


    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        const request: CreateMeetingRequest = {
            meetingGroupId: meetingGroupId,
            description: description,
            eventFeeCurrency: '',
            guestsLimit: guestsLimit,
            hostMemberIds: [],
            meetingLocationAddress: meetingLocationAddress,
            meetingLocationCity: meetingLocationCity,
            meetingLocationName: meetingLocationName,
            meetingLocationPostalCode: meetingLocationPostalCode,
            rsvpTermEndDate: rsvpTermEndDate,
            rsvpTermStartDate: RSVPTermStartDate,
            termEndDate: termEndDate,
            termStartDate: termStartDate,
            title: title,
            attendeesLimit: attendeesLimit,
            eventFeeValue: eventFeeValue
        }

        HttpClient.post<any>('api/meetings/meetings', JSON.stringify(request))
            .then(() => afterSubmit())
            .catch(onrejected => {
            });

        event.preventDefault();
    }

    
    function afterSubmit() {

    }


    return (
        <div className="container">
            Create Meeting
            
            <form onSubmit={handleSubmit}>
                <div>
                    <div>Title: </div><div><input type="text" value={title} onChange={event => setTitle(event.target.value)} /></div>
                    <div>Description: </div><div><input type="textarea" value={description} onChange={event => setDescription(event.target.value)} /></div>
                    <div>Name: </div><div><input type="text" value={meetingLocationName} onChange={event => setMeetingLocationName(event.target.value)} /></div>
                    <div>Address: </div><div><input type="text" value={meetingLocationAddress} onChange={event => setMeetingLocationAddress(event.target.value)} /></div>
                    <div>Postal code: </div><div><input type="text" value={meetingLocationPostalCode} onChange={event => setMeetingLocationPostalCode(event.target.value)} /></div>
                    <div>City: </div><div><input type="text" value={meetingLocationCity} onChange={event => setMeetingLocationCity(event.target.value)} /></div>
                    <div>Start date: <DatePicker selected={termStartDate} onChange={date => setTermStartDate(date)} /></div>
                    <div>End date:<DatePicker selected={termEndDate} onChange={date => setTermEndDate(date)} /></div>
                    <div>RSVP start date: <DatePicker selected={RSVPTermStartDate} onChange={date => setRSVPTermStartDate(date)} /></div>
                    <div>RSVP end date: <DatePicker selected={rsvpTermEndDate} onChange={date => setRSVPTermEndDate(date)} /></div>
                    
                    <div>Attendees limit <input type="number" value={attendeesLimit} onChange={event => setAttendeesLimit(Number.parseInt(event.target.value))} /></div>
                    <div>Guests limit <input type="number" value={guestsLimit} onChange={event => setGuestsLimit(Number.parseInt(event.target.value))} /></div>
                    <div><input type="submit" value="Send Proposal" /></div>
                </div>
            </form>
        </div>
    )
}