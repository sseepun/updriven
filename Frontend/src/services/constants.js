//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE = "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE = "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE = "An error has occurred. The photo was unable to upload.";
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

export const API_URL = (process.env.VUE_APP_API_URL + '/apis')

export const server = {

    // Authenticatin
    SIGN_IN: { method: 'POST', url: `auth/login`},
    SIGN_FACEBOOK: { method: 'GET', url: `auth/facebook`},
    SIGN_GOOGLE: { method: 'GET', url: `auth/google`},
    SIGN_OUT: { method: 'GET', url: `auth/logout`},

    REGISTER: { method: 'POST', url: `auth/signup`},

    CHECK_AUTH: { method: 'GET', url: `auth/success`},
    CHECK_TOKEN_RESET_PASSWORD: { method: 'GET', url: `auth/reset`},
    RESET_PASSWORD: { method: 'POST', url: `auth/reset`},

    VERIFY_EMAIL_REGISTER: { method: 'GET', url: `auth/verify`},
    FORGET_PASSWORD_SENT_ENAIL: { method: 'GET', url: `auth/forgot`},

    // User
    FETCH_OWNER_PROFILE: { method: 'GET', url: `auth/status`},
    FETCH_USER_INFORMATION: { method: 'GET', url: `user/profile`},
    FETCH_FOLLOWING_LIST: { method: 'POST', url: `user/following_list`},
    FETCH_IMAGE_LIST: { method: 'POST', url: `user/image_list`},

    TO_FOLLOW: { method: 'POST', url: `user/follow`},
    TO_UN_FOLLOW: { method: 'POST', url: `user/unfollow`},

    EDIT_PROFILE: { method: 'POST', url: `user/edit_info`},
    CHANGE_PICTURE_PROFILE: { method: 'POST', url: `user/edit_profile_image`},
    CHANGE_BACKGROUND_PROFILE: { method: 'POST', url: `user/edit_background_image`},

    // Notification
    GET_ALL_NOTIFY: { method: 'GET', url: `user/notification`},
    CLEAR_ALL_NOTIFY: { method: 'POST', url: `user/clear_notification`},

    // Feed
    FETCH_FEED: { method: 'POST', url: `feed/post`},
    FETCH_POST: { method: 'POST', url: `user/post`},
    PREVIEW_LINK: { method: 'POST', url: ``},

    CREATE_POST: { method: 'POST', url: `post/create`},
    DELETE_POST: { method: 'POST', url: `post/delete`},

    SENTIMENT_POST: { method: 'POST', url: `post/sentiment`},
    REMOVE_SENTIMENT_POST: { method: 'POST', url: `post/remove_sentiment`},

    FETCH_COMMENT: { method: 'POST', url: `feed/comment`},
    COMMENT_OR_REPLY_POST: { method: 'POST', url: `post/comment`},

    SHARE_POST: { method: 'POST', url: `post/share`},

    // Category
    FETCH_CATEGORY: { method: 'GET', url: `feed/category`},

    // Search
    SEARCH: { method: 'POST', url: `feed/search`},

    // Ads
    FETCH_ADS: { method: 'GET', url: `feed/ads_list`},
    ADD_ADS: { method: 'POST', url: `admin/add_ads`},
    EDIT_ADS: { method: 'POST', url: `admin/edit_ads`},
    DELETE_ADS: { method: 'POST', url: `admin/delete_ads`},

};
