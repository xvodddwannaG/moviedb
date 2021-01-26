import React, {useEffect, useState} from 'react';
import {TabContent} from "reactstrap";
import CallApi from "../../api/api_v2";
import {useParams} from "react-router";

const Videos = () => {
    const [videos, setVideos] = useState([]);
    const {id} = useParams()

    useEffect(() => {
        CallApi.get(`/movie/${id}/videos`).then((res) => setVideos(res.results));
    }, [])

    console.log(videos.length !== 0)

    return (
        <TabContent>
            <div className="row">
                {videos.map((video) => {
                    return (
                        <div className='col-6' key={video.id}>
                            <iframe title='video' width='100%' height='260'
                                    src={`https://www.youtube.com/embed/${video.key}`} frameBorder='0'
                                    allowFullScreen></iframe>
                        </div>
                    )
                })}
            </div>
        </TabContent>
    );
};

export default Videos;