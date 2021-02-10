import React, { useEffect, Suspense } from "react";
import Header from "./components/Header";
import MoviesPage from "./pages/MoviesPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserInitialData } from "./redux/actionCreators";
import { ClipLoader } from "react-spinners";

const MoviePage = React.lazy(() => import("./pages/MoviePage"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInitialData());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Route path="/" exact component={MoviesPage} />
      <Suspense fallback={<ClipLoader />}>
        <Switch>
          <Route path="/movie/:id" component={MoviePage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
