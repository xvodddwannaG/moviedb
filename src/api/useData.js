import {useEffect, useState} from 'react';
import {API_URL} from "./api";
import * as queryString from "querystring";

export const useData = (query) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);

    const link = `${API_URL}/discover/movie?${queryString.stringify(query)}`

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            try {
                const result = await fetch(link).then((res) => res.json());

                setData(result);
            }
            catch (e) {
                setIsError(true);
            }
            finally {
                setIsLoading(false);
            }
        }
        getData()
    }, [link])


    return {
        data,
        isError,
        isLoading
    }
}