import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import eventBus from "../../eventBus/eventBus";
// import {useLocation} from "react-router-dom";


class ItemsPage extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    resultItems: [],
    isLoading: true,
    searchQuery: ''
  }

  static propTypes = {
    location: PropTypes.object.isRequired,
  }
  
  componentDidMount() {
    const stringQuery = this.getStringQuery().get('search')
    this.getItems(stringQuery)
    eventBus.on("onSearchDone", (data) => {
      this.getItems(data.query)
    });
  }

  componentWillUnmount() {
    eventBus.remove("onSearchDone");
  }

  getStringQuery () {
    const { location } = this.props;
    return new URLSearchParams(location.search);
  }

  getItems = (stringQuery) => {
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=:${stringQuery}&limit=8`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        resultItems: data.results,
        isLoading: false,
        searchQuery: stringQuery
      })
    })
  }

  render() {
    const { resultItems, isLoading, searchQuery } = this.state;
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <ul>
        <h1>
          Results for {searchQuery}
        </h1>
        {resultItems.map(result =>
          <li key={result.id}>
            <p>
              {result.title}
            </p>
          </li>
        )}
      </ul>
    )
  }

}
export default withRouter(ItemsPage);