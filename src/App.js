import './scss/global.scss';
import banner from './assets/banner.webp';
import SearchBar from "./components/SearchBar/SearchBar";
import ItemsPage from "./pages/ItemsPage/ItemsPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <SearchBar />
        <div className="containerFluid">
          <Switch>
            <Route exact path="/">
              <img src={banner} alt="Welcome" title="Welcome" />
            </Route>
          </Switch>
        </div>
        <div className="container pb30 pt30">
          <Switch>
            <Route path="/items">
              <ItemsPage />
            </Route>
            <Route path="/detail/:id">
              <DetailPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
