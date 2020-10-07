import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMeetingList } from '~/redux/meetings/action';  
import MeeterList from './children/MeeterList';
import GPRenderComponent from 'gpcoders-render-component';
import { CustomLoader } from '../../../../../utils/Loader';


function MeetingList() { 
    const dispatch = useDispatch();
    useEffect(() => { 
        dispatch(getMeetingList());
    }, [])

    const meeting = useSelector(state => state.meeting);
    const { meeting_spinner, meeting_list } = meeting;
    console.log(meeting_spinner);
    console.log(meeting_list);

    return (
        <>  

           <GPRenderComponent component={MeeterList} spinner={meeting_spinner} data={meeting_list} customSpinner={<CustomLoader active />} />
        </>

    );
}

export default MeetingList