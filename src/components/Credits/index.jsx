import React, {useEffect, useState} from 'react';
import {TabContent} from "reactstrap";
import CallApi from "../../api/api_v2";
import {useParams} from "react-router-dom";

const Credits = () => {
    const [credits, setCredits] = useState([]);
    const {id} = useParams()

    useEffect(() => {
        CallApi.get(`/movie/${id}/credits`)
            .then((res) => setCredits(res.cast));
    }, [])

    return (
        <TabContent>
            <ul className="row movie-actors">
                {credits.map((item) => {
                    return (
                        <li className='col-3 movie-actors__item' key={item.id}>
                            <img src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} alt={item.name}/>
                            <div className="movie-actors__name">
                                <h3>{item.original_name}</h3>
                                <span>{item.character}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </TabContent>
    );
};

export default Credits;