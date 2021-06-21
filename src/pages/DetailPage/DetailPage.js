import './DetailPage.scss'
import React, { Component } from 'react';
import { withRouter } from "react-router";
import PropTypes from "prop-types";


class DetailPage extends Component {
  state = {
    resultItems: {},
    isLoading: true,
    idQuery: ''
  }

  static propTypes = {
    match: PropTypes.object.isRequired
  }
  
  componentDidMount() {
    const stringQuery = this.getStringQuery()
    this.getItems(stringQuery)
  }

  getStringQuery () {
    const { match } = this.props
    return match.params.id
  }

  getItems = (stringQuery) => {
    const getItem = fetch(`https://api.mercadolibre.com/items/${stringQuery}`).then(res => res.json())
    const getItemDescription = fetch(`https://api.mercadolibre.com/items/${stringQuery}/description`).then(res => res.json())

    Promise.all([getItem, getItemDescription])
    .then(([item, itemDescription]) => {
      console.log(item, itemDescription)
      this.setState({
        resultItems: {
          ...item,
          ...itemDescription
        },
        isLoading: false,
        idQuery: stringQuery
      })
      console.log(this.state.resultItems)
    });
  }

  render() {
    const { resultItems, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <article className="detailPage">
        <div className="row no-gutters">
          <div className="col-md-8">
            <div className="detailPage__image">
              <img className="detailPage__image_img" src={resultItems.pictures[0].url} alt="" />
            </div>
          </div>
          <div className="col-md-4">
            <p className="detailPage__state mt20 mb10">
              {resultItems.condition === 'new' ? 'Nuevo' : 'Usado'} - {resultItems.sold_quantity} vendidos
            </p>
            <h1 className="detailPage__title mb20">
              {resultItems.title}
            </h1>
            <h2 className="detailPage__price">
              {this.currencyFormat(resultItems.price)}
            </h2>
          </div>
        </div>
        <div className="row no-gutters mt70">
          <div className="col-md-9">
            <div className="detailPage__description">
              <h3 className="detailPage__description_title mb20">Descripción del producto</h3>
              <p className="detailPage__description_text">
                {resultItems.plain_text ? resultItems.plain_text : 'No hay descripción'}
              </p>
            </div>
          </div>
        </div>
      </article>
    )
  }

  currencyFormat (num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

}
export default withRouter(DetailPage);