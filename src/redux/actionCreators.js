import {LOGOUT, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, UPDATE_USER_STARTING} from "./actionType";

export const setUserData = (payload) => ({
    type: UPDATE_USER_SUCCESS,
    payload,
})

export const setLogout = () => ({
    type: LOGOUT,
})

export const setUpdateUserError = (payload) => ({
    type: UPDATE_USER_ERROR,
    payload
})

export const setUpdateUserStarting = (payload) => ({
    type: UPDATE_USER_STARTING,
    payload
})