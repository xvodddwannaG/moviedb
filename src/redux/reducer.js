import {LOGOUT, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, UPDATE_USER_STARTING} from "./actionType";

const authInitialState = {
    user: null,
    session_id: null,
    updateUserError: null,
    userIsLoading: false,
}

export const authReducer = (state = authInitialState, action) => {
    switch (action.type) {
        case UPDATE_USER_STARTING:
            return {
                ...state,
                userIsLoading: true,
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                session_id: action.payload.session_id,
                updateUserError: null,
                userIsLoading: false,
            }
        case LOGOUT :
            return {
                ...state,
                session_id: null,
                user: null,
            }
        case UPDATE_USER_ERROR :
            return {
                ...state,
                updateUserError: action.payload,
                userIsLoading: false,
            }
        default:
            return state;
    }
}