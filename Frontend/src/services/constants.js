//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE = "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE = "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE = "An error has occurred. The photo was unable to upload.";
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

export const apiUrl = (process.env.VUE_APP_API_URL + '/apis')

export const server = {

    // Authenticatin
    GET_PROFILE_URL: `auth/status`,
    SIGN_IN_URL: `auth/login`,
    SIGN_FACEBOOK_URL: `auth/facebook`,
    SIGN_GOOGLE_URL: `auth/google`,
    CHECK_TOKEN_RESET_PASSWORD_URL: `auth/reset`,
    RESET_PASSWORD_URL: `auth/reset`,
    VERIFY_URL: `auth/success`,
    SIGN_OUT: `auth/logout`,
    VERIFY_EMAIL_REGISTER_URL: `auth/verify`,
    FORGET_PASSWORD_SENT_ENAIL_URL: `auth/forgot`,

    // User
    FETCH_POST_OWNER_URL: `user/post`,
    EDIT_PICTURE_PROFILE_URL: `user/edit_profile_image`,
    EDIT_BACKGROUND_PROFILE_URL: `user/edit_background_image`,
    EDIT_PROFILE_URL: `user/edit_info`,
    GET_ALL_NOTIFY: `/user/notification`,
    CLEAR_ALL_NOTIFY: `/user/clear_notification`,

    // Post
    CREATE_POST_URL: `post/create`,
    DELETE_POST_URL: `post/delete`,
    SENTIMENT_URL: `post/sentiment`,
    REMOVE_SENTIMENT_URL: `post/remove_sentiment`,
    COMMENT_OR_REPLY_URL: `post/comment`,
    SHARE_POST_URL: `post/share`,

    // Feed
    FETCH_POST_ALL_URL: `feed/post`,
    FETCH_COMMENT_URL: `feed/comment`,

};
