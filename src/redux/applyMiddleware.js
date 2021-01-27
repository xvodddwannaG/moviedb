import {setLogout, setUpdateUserError, setUpdateUserStarting, setUserData} from "./actionCreators";
import CallApi from "../api/api_v2";
import Cookies from "universal-cookie";

const cookies = new Cookies()
const ONE_WEEK_COOKIES_TIME = 604800;

export const getUser = (username, password) => async (dispatch) => {
    await dispatch(setUpdateUserStarting())
    const result = await CallApi.authorization(username, password);
    if (result.success === false) {
        dispatch(setUpdateUserError(result.errorMessage))
    } else {
        await dispatch(setUserData({user: result.userData, session_id: result.session_id}))
        await cookies.set("session_id", result.session_id, {path: '/', maxAge: ONE_WEEK_COOKIES_TIME})
    }
}

export const userLogout = (session_id) => async (dispatch) => {
    await CallApi.delete("/authentication/session",{body: {session_id: session_id}})
    await cookies.remove("session_id");
    await dispatch(setLogout())
}

export const getCookies = () => async (dispatch) => {
    const session_id = await cookies.get("session_id")
    if (session_id) {
        const result = await CallApi.get('/account', {params: {session_id}})
        await dispatch(setUserData({user: result, session_id: session_id}))
    }
}