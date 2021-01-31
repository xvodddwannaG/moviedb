import {useSelector} from "react-redux";

const userData = (state) => state.user
const session_id = (state) => state.session_id
const errorMessage = (state) => state.updateUserError

export const useUserData = () => useSelector(userData)
export const useSessionId = () => useSelector(session_id)
export const useErrorMessage = () => useSelector(errorMessage)