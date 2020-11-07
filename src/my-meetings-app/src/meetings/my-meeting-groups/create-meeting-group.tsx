import { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import React from 'react';
import { HttpClient } from '../../shared/http-client';

export default interface ProposeMeetingGroupRequest {
    name: string,
    description: string,
    locationCity: string,
    locationCountryCode: string
}

interface Country {
    name: string,
    code: string
}

export function CreateMeetingGroup() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [countryCode, setCountryCode] = useState('PL');
    const [isProposalSent, setIsProposalSent] = useState(false);
    const [countries, setCountries] = useState<Array<Country>>([]);


    useEffect(() => {
        loadCountries();
    }, []);

    function loadCountries() {
        HttpClient.get<Array<Country>>('api/meetings/countries')
            .then(response => setCountries(response));
    }

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value);
    }

    function handleCityChange(event: ChangeEvent<HTMLInputElement>) {
        setCity(event.target.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        const request: ProposeMeetingGroupRequest = {
            locationCity: city,
            locationCountryCode: countryCode,
            description: description,
            name: name
        }

        HttpClient.post<any>('api/meetings/MeetingGroupProposals', JSON.stringify(request))
            .then(() => setIsProposalSent(true))
            .catch(onrejected => {
            });

        event.preventDefault();
    }

    function handleCountryChange(event: ChangeEvent<HTMLSelectElement>) {
        setCountryCode(event.target.value);
    }

    return (
        <div className="container">
            Create Meeting group
            
            {!isProposalSent && 
            <form onSubmit={handleSubmit}>
                <div>
                    <div>Name: </div><div><input type="text" value={name} onChange={handleNameChange} /></div>
                    <div>Description: </div><div><input type="textarea" value={description} onChange={handleDescriptionChange} /></div>
                    <div>City: </div><div><input type="text" value={city} onChange={handleCityChange} /></div>
                    <div>Country: </div>
                    <div>
                        <select name="Country" 
                        onChange={handleCountryChange} 
                        onLoadedData={handleCountryChange} 
                        value={countryCode}>
                            {countries.map(item =>
                                <option label={item.name} value={item.code}></option>)}
                        </select>
                    </div>
                    <div><input type="submit" value="Send Proposal" /></div>
                </div>
            </form>
            }

            {isProposalSent &&
                <div>Proposal sent</div>
            }
        </div>
    )
}