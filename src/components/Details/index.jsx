import React from 'react';
import {TabContent} from "reactstrap";

const Details = ({movieData={}}) => {
    return (
        <TabContent>
                <table className='table'>
                    <tbody>
                    <tr>
                        <th>Статус</th>
                        <td>{movieData.status}</td>
                    </tr>
                    <tr>
                        <th>Дата выхода</th>
                        <td>{movieData.release_date}</td>
                    </tr>
                    <tr>
                        <th>Продолжительность</th>
                        <td>{`${movieData.runtime} минут`}</td>
                    </tr>
                    <tr>
                        <th>Язык оригинала</th>
                        <td>{movieData.original_language}</td>
                    </tr>
                    <tr>
                        <th>Страна</th>
                        <td>{Object.keys(movieData).length !== 0 ? movieData.production_countries.map((item) => {
                            return (item.name)
                        }) : ''}</td>
                    </tr>
                    <tr>
                        <th>Бюджет</th>
                        <td>{movieData.budget}</td>
                    </tr>
                    <tr>
                        <th>Сборы</th>
                        <td>{movieData.revenue}</td>
                    </tr>
                    <tr>
                        <th>Компания</th>
                        <td>{Object.keys(movieData).length !== 0 ? movieData.production_companies.map((item) => item.name).join(', ') : ''}</td>
                    </tr>
                    <tr>
                        <th>Жанры</th>
                        <td>{Object.keys(movieData).length !== 0 ? movieData.genres.map((item) => item.name).join(', ') : ''}</td>
                    </tr>
                    </tbody>
                </table>
        </TabContent>
    );
};

export default Details;