import './scss/global.scss';
import SearchBar from "./components/SearchBar/SearchBar";
import ItemsPage from "./pages/ItemsPage/ItemsPage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <SearchBar />
        <Switch>
          <Route exact path="/">
            Welcome
          </Route>
          <Route path="/items">
            <ItemsPage />
          </Route>
        </Switch>

      </Router>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
