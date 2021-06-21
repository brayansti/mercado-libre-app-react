import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import eventBus from "../../eventBus/eventBus";
import {Link} from "react-router-dom";
import freeShippingIcon from '../../assets/ic_shipping.png';
import './ItemsPage.scss';


class ItemsPage extends Component {
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
      console.log(data.results)
      this.setState({
        resultItems: data.results,
        isLoading: false,
        searchQuery: stringQuery
      })
    })
  }

  render() {
    const { resultItems, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <article className="itemsResults">
        <ol>
          {resultItems.map(result =>
            <li key={result.id}>
              <Link to={`/detail/${result.id}`} className="itemResult" title={result.title}>
                <div className="itemResult__image">
                  <img src={result.thumbnail} alt={result.title} />
                </div>
                <div className="itemResult__info pt10">
                  <p className="itemResult__info_price">
                    {this.currencyFormat(result.price)}
                    {result.shipping.free_shipping ? <img className="ml10" src={freeShippingIcon} alt={result.shipping.logistic_type} /> : ''}
                  </p>
                  <p className="itemResult__info_description mt10">
                    {result.title}
                  </p>
                </div>
                <div className="itemResult__city pt30">
                  {result.address.state_name}
                </div>
              </Link>
            </li>
          )}
        </ol>
      </article>
    )
  }

  currencyFormat (num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

}
export default withRouter(ItemsPage);