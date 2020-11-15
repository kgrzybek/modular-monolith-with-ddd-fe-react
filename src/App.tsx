import React, { useEffect, useState } from 'react';
import './App.css';
import { LoginControl } from './login/login-control';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { MyMeetingsGroups } from './meetings/my-meeting-groups/my-meetings-groups';
import { CreateMeetingGroup } from './meetings/my-meeting-groups/create-meeting-group';
import { AdministrationMeetingGroupProposalsList } from './administration/MeetingGroupProposals/meeting-group-proposals-list';
import { SubscriptionBuy } from './payments/subscriptions/subscription-buy';
import { MeetingGroupDetails } from './meetings/meeting-groups/meeting-group-details';
import { CreateMeeting } from './meetings/create-meeting';
import { MeetingDetails } from './meetings/meeting-details';
import { UserRegistrationForm } from './user-registration/user-registration-form';
import { AllEmailsList } from './emails/all-emails-list';
import { RegistrationConfirm } from './user-registration/registration-confirm';
import { AllMeetingGrups } from './meetings/meeting-groups/all-meeting-groups';
import { MyMeetings } from './meetings/my-meetings/my-meetings';
import { AuthenticationService } from './login/authentication/authentication-service';
import { HttpClient } from './shared/http-client';
import { SubscriptionDetails } from './payments/subscriptions/subscription-details';
import { SubscriptionPaymentStatus } from './payments/subscriptions/subscription-payment-status';
import { SubscriptionPaymentSuccess } from './payments/subscriptions/subscription-payment-success';


interface Permission {
    code: string;
}


function App() {

    const [permissions, setPermissions] = useState<Array<Permission>>([]);

    useEffect(() => {
        loadPermissions();
    }, []);

    function loadPermissions() {
        const isAuthenticated = AuthenticationService.isAuthenticated();

        if (isAuthenticated) {
            HttpClient.get<Array<Permission>>('api/userAccess/authenticatedUser/permissions')
                .then(response => setPermissions(response));
        }
    }

    function isAuthenticated(): boolean {
        return AuthenticationService.isAuthenticated();
    }

    function hasPermission(permission: string): boolean {
        return permissions.map(x => x.code).includes(permission);
    }

    return (
        <div className="App">
            <header className="App-header">


                <LoginControl />

                <Router>
                    <div className="container">
                        <div id="menu">

                            <span><Link to="/">Home</Link></span>

                            {hasPermission('MyMeetingsGroupsView') &&
                                <span><Link to="/my-meeting-groups">My Meeting Groups</Link></span>
                            }

                            {hasPermission('MyMeetingsView') &&
                                <span><Link to="/my-meetings">My Meetings</Link></span>
                            }

                            {hasPermission('AllMeetingGroupsView') &&
                                <span><Link to="/meeting-groups">Explore Meeting Groups</Link></span>
                            }

                            {hasPermission('AdministrationsView') &&
                                <span><Link to="/administration/meetingGroupProposals">Administration</Link></span>
                            }

                            {hasPermission('SubscriptionView') &&
                                <span><Link to="/subscription">Subscription</Link></span>
                            }

                            {!isAuthenticated() &&
                                <span><Link to="/register">Registration</Link></span>
                            }


                            <span><Link to="/emails">Emails</Link></span>

                        </div>

                        <Route exact path="/my-meeting-groups/" component={MyMeetingsGroups} />
                        <Route exact path="/meeting-groups/" component={AllMeetingGrups} />
                        <Route exact path="/meeting-groups-create/" component={CreateMeetingGroup} />
                        <Route exact path="/meeting-groups/:meetingGroupId/meetings/create" component={CreateMeeting} />
                        <Route exact path="/meeting-groups/:meetingGroupId" component={MeetingGroupDetails} />
                        <Route exact path="/subscription" component={SubscriptionDetails} />
                        <Route exact path="/subscription/buy" component={SubscriptionBuy} />
                        <Route exact path="/subscription/payment-status" component={SubscriptionPaymentStatus} />
                        <Route exact path="/subscription/payment-success" component={SubscriptionPaymentSuccess} />
                        <Route exact path="/administration/meetingGroupProposals" component={AdministrationMeetingGroupProposalsList} />
                        <Route exact path="/my-meetings" component={MyMeetings} />
                        <Route exact path="/meetings/:meetingId" component={MeetingDetails} />
                        <Route exact path="/register" component={UserRegistrationForm} />
                        <Route exact path="/emails" component={AllEmailsList} />
                        <Route exact path="/registration-confirm/:registrationId" component={RegistrationConfirm} />
                    </div>
                </Router>

            </header>
        </div>
    );
}

export default App;
