import logo from './logo.svg';
import './App.scss';
import {BrowserRouter as Router, Link, useLocation, Route, Switch} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <SearchBar />

        <Switch>
          <Route exact path="/">
            Welcome
          </Route>
          <Route path="/detail">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe iste consequatur sunt! Quas doloribus, excepturi tempore nemo numquam porro. Vitae minus perferendis deserunt cumque provident voluptatibus ipsum blanditiis quo odit!
          </Route>
        </Switch>

      </Router>
      <header className="App-header">
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
      </header>
    </div>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


function SearchBar() {
  let query = useQuery();

  return (
    <div>
      <div>
        <h2>details</h2>
        <ul>
          <li>
            <Link to="/detail?name=netflix">Netflix</Link>
          </li>
          <li>
            <Link to="/detail?name=zillow-group">Zillow Group</Link>
          </li>
          <li>
            <Link to="/detail?name=yahoo">Yahoo</Link>
          </li>
          <li>
            <Link to="/detail?name=modus-create">Modus Create</Link>
          </li>
        </ul>

        <Child name={query.get("name")} />
      </div>
    </div>
  );
}


function Child({ name }) {
  return (
    <div>
      {name ? (
        <h3>
          The <code>name</code> in the query string is &quot;{name}
          &quot;
        </h3>
      ) : (
        <h3>There is no name in the query string</h3>
      )}
    </div>
  );
}

export default App;
