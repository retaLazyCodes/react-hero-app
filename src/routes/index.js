import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Home from "../views/Home"
import Search from "../views/Search";
import Results from "../views/Results";
import Biography from "../views/Biography";
import Login from "../views/Login";
import Header from "../components/Header";

export default function Routes() {
  return (
    <Router>
      <Header />
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/search' component={Search} />
      <Route path='/results/:searchText' component={Results} />
      <Route path='/hero/:id' component={Biography} />
    </Router>

  );
}