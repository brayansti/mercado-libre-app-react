import './breadCrumb.scss'
import React, { Component } from 'react';

class BreadCrumb extends Component {
  constructor(props) {
    super(props)
    console.log('HEY', props)
  }
  state = {
    categories: [],
    query: 'iphone 5'
  }

  componentDidMount() {
    this.getCategories(this.props.query)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.setState({
        categories: [],
      })
      this.getCategories(this.props.query)
    }
  }


  getCategories = (query) => {
    fetch(`https://api.mercadolibre.com/sites/MLA/domain_discovery/search?limit=1&q=${query}`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        categories: data,
      })
      console.log(this.state.categories)
    })
  }

  render () {
    const { categories } = this.state;
    return(
      <article className="breadCrumb">
        {categories.length > 0 &&
          <section className="breadCrumb__content">
            <span className="breadCrumb__item">{categories[0].category_name}</span>
            {categories[0].attributes.map(category =>
              <span className="breadCrumb__item" key={category.value_id}>
                {category.value_name}
              </span>
            )}
          </section>
        }
      </article>
    )
  }
}

export default BreadCrumb;