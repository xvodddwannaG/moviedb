import {API_URL, API_KEY_3} from "./api";
import queryString from "querystring";

const fetchApi = async (url, options = {}) => {
    try {
        return await fetch(url, options).then((res) => res.json())
    } catch (e) {
        return e
    }
}

export default class CallApi {
    static get(endpoint, options = {}) {
        const {params = {} } = options;
        const queryStringParams = {
            api_key: API_KEY_3,
            ...params
        };

        return fetchApi(`${API_URL}${endpoint}?${queryString.stringify(queryStringParams)}`)
    }

    static post (endpoint, options = {}) {
        const {params = {}, body} = options;
        const queryStringParams = {
            api_key: API_KEY_3,
            ...params
        };

        return fetchApi(`${API_URL}${endpoint}?${queryString.stringify(queryStringParams)}`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(body)
            })
    }

    static delete (endpoint, options = {}) {
        const {params = {}, body} = options;
        const queryStringParams = {
            api_key: API_KEY_3,
            ...params
        };

        return fetchApi(`${API_URL}${endpoint}?${queryString.stringify(queryStringParams)}`,
            {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(body)
            })
    }

    static async authorization (username, password) {
        try {
            const {request_token} = await CallApi.get('/authentication/token/new')
            const validateDate = await CallApi.post('/authentication/token/validate_with_login', {body: {username, password, request_token}})
            if (validateDate.success === false) {
                throw new Error(validateDate.status_message);
            }
            const {session_id} = await CallApi.post('/authentication/session/new', {body: {request_token}})
            const data = await CallApi.get('/account', {params: {session_id}})
            return {userData: data, session_id}
        } catch (e) {
            return {success: false, errorMessage: e.message}
        }
    }
}