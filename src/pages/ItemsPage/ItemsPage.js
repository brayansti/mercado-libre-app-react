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
    categories: [],
    isLoading: true,
    searchQuery: '',
  }

  static propTypes = {
    location: PropTypes.object.isRequired,
  }
  
  componentDidMount() {
    const stringQuery = this.getStringQuery().get('search')
    this.getItems(stringQuery)
    eventBus.on("onSearchDone", (data) => {
      this.setState({categories : []})
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
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=:${stringQuery}&limit=4`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        resultItems: data.results,
        isLoading: false,
        searchQuery: stringQuery
      })
      this.getCategories()
    })
  }
  
  getCategories = () => {
    fetch(`https://api.mercadolibre.com/sites/MLA/domain_discovery/search?limit=1&q=${this.state.searchQuery}`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        categories: data,
      })
      console.log(this.state.categories)
    })
  }

  render() {
    const { resultItems, isLoading, categories } = this.state;
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <article>
        {categories.length > 0 &&
          <section className="breadCrumb">
            <span className="breadCrumb__item">{categories[0].category_name}</span>
            {categories[0].attributes.map(category =>
              <span className="breadCrumb__item" key={category.value_id}>
                {category.value_name}
              </span>
            )}
          </section>
        }
        <section className="itemsResults">
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
        </section>
      </article>
    )
  }

  currencyFormat (num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

}
export default withRouter(ItemsPage);