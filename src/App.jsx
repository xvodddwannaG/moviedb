import React, {useState, useEffect} from "react";
import Cookies from 'universal-cookie';
import {API_KEY_3, API_URL} from "./api/api";
import Header from "./components/Header";
import MoviesPage from "./pages/MoviesPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MoviePage from "./pages/MoviePage";

export const AppContext = React.createContext();
const cookies = new Cookies();
const ONE_WEEK_COOKIES_TIME = 604800;

const App = () => {
    const [userData, setUserData] = useState(null);
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {
        const session_id = cookies.get("session_id")
        if (session_id) {
            fetch(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`)
                .then((res) => res.json()).then((res) => setUserData(res));
            setSessionId(session_id);
        }
    }, [])

    const updateUserData = (user, session_id) => {
        setUserData(user)
        setSessionId(session_id)

        if (session_id === null) {
            cookies.remove("session_id")
        } else {
            cookies.set("session_id", session_id, {path: '/', maxAge: ONE_WEEK_COOKIES_TIME})
        }
    };

    return (
        <BrowserRouter>
            <AppContext.Provider value={{userData, sessionId, updateUserData}}>
                <Header/>
            </AppContext.Provider>
            <Route path='/' exact component={MoviesPage}/>
            <Switch>
                <Route path='/movie/:id' component={MoviePage}/>
            </Switch>
        </BrowserRouter>
    );
};


export default App;