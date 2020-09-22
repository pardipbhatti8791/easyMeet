import React, { Fragment } from 'react'; 
import UserInfo from './UserInfo/UserInfo';
import MeetingList from './MeetingList/MeetingList';

const Dashboard = () => { 

    return (
        <Fragment>
            <UserInfo /> 
            <MeetingList />
        </Fragment>
    );
};

export default Dashboard;
