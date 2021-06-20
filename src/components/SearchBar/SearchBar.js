import './SearchBar.scss'
import logo from '../../assets/Logo_ML.png';
import React, { Component } from 'react';
import { withRouter } from "react-router";
import PropTypes from "prop-types";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };

    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  };

  handleSubmit (event) {
    const { history } = this.props;
    event.preventDefault()
    history.push(`/items?search=${this.state.searchValue}`)
  }

  handleSearchChange (event) {
    this.setState({
      searchValue: event.target.value
    })
  }

  render () {
    return(
      <article className="searchBar">
        <section className="searchBar__content">
          <div className="searchBar__logo mr15">
            <img src={logo} alt="Merdado libre" />
          </div>
          <form className="searchBar__form" onSubmit={this.handleSubmit}>
            <div className="searchBar__form_search">
              <input onChange={this.handleSearchChange} placeholder="Nunca dejes de buscar" type="text" />
            </div>
            <div className="searchBar__form_button">
              <input type="submit" value=""/>
            </div>
          </form>
        </section>
      </article>
    )
  }
}

export default withRouter(SearchBar);