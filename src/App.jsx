import React, { useEffect } from "react";
import Header from "./components/Header";
import MoviesPage from "./pages/MoviesPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import { useDispatch } from "react-redux";
import { getUserInitialData } from "./redux/actionCreators";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInitialData());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Route path="/" exact component={MoviesPage} />
      <Switch>
        <Route path="/movie/:id" component={MoviePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
