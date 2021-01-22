import {API_KEY_3, API_URL} from "./api";

export const getSession = async (username, password) => {
    let data = '';
    let error;

    try {
        const {request_token} = await fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`).then((res) => res.json());
        const result = await fetch(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                request_token: request_token,
            })
        }).then((res) => res.json());
        const {session_id} = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY_3}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                request_token: result.request_token
            })
        }).then((res) => res.json()).then((res) => data = res);
        return data
    } catch (e) {
        return error = e
    }
}