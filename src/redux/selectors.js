import {useSelector} from "react-redux";

const userData = (state) => state.user
const session_id = (state) => state.session_id

export const useUserData = () => useSelector(userData)
export const useSessionId = () => useSelector(session_id)