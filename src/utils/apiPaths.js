export const apiPaths = {
    user_management: {
        signUp: '/sign-up',
        login: '/login',
        update_bio: '/update-meeter-bio',
        update_profile_pic: '/upload-meeter-image',
        change_availability: '/meeter/change-availibity',
        check_meeter_availabiliy: 'check-meeter-availibility?meeter_id=',
        get_meeter_from_slug: '/meeter-details?meet_slug='
    },
    meeter_slug: '/check-meeting-slug/?meeter_slug=',    
    meeter_slug_update: '/update-meeting-slug',
    get_meeting_request_url: '/meeting-request-send',
    get_meeting_list: 'show-meetings?meeting_status=all&keywords=&page=&limit=',
    change_meeting_status :'/meeter/change-meeting-status'
    
};
