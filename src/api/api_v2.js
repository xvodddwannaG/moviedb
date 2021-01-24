import {API_URL, API_KEY_3} from "./api";
import queryString from "querystring";

const fetchApi = async (url, options = {}) => {
    try {
        const result = await fetch(url, options)
            .then((response) => response.json())
        return result
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

        console.log(body)
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
}