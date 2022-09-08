import React from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

class Home extends React.Component {
  state = {
    search: '',
    searchResult: [],
    listCategories: [],
  };

  componentDidMount() { this.fetchCategories(); }

  fetchCategories = async () => {
    const fetchCategories = await api.getCategories();
    this.setState({ listCategories: fetchCategories });
  };

  handleChange = async (event) => {
    const { value } = event.target;
    this.setState({ search: value });
  };

  handleClick = async (search) => {
    const searchAPI = await api.getProductsFromCategoryAndQuery(search);
    const { results } = searchAPI;
    this.setState({ searchResult: results });
  };

  renderComponent = () => {
    const { listCategories } = this.state;
    return (
      <div>
        <div>
          {
            listCategories.map((e) => (
              <button
                key={ e.id }
                type="submit"
                data-testid="category"
              >
                {e.name}
              </button>))
          }
        </div>
      </div>);
  };

  render() {
    const { search, searchResult } = this.state;
    return (
      <div>
        <h1>home</h1>
        <div>
          { this.renderComponent() }
        </div>
        <label htmlFor="search">
          <input
            id="search"
            type="text"
            data-testid="query-input"
            value={ search }
            placeholder="Search"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ () => this.handleClick(search) }
          >
            Pesquisar
          </button>
          <div data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </div>
        </label>
        <Link data-testid="shopping-cart-button" to="/shoppingcart" />
        {searchResult.length === 0
          ? <p>Nenhum produto foi encontrado</p>
          : (
            <div>
              {searchResult.map((product) => {
                const { id, title, price, thumbnail } = product;
                return (
                  <div key={ id } data-testid="product">
                    <img src={ thumbnail } alt={ title } />
                    <h3>{title}</h3>
                    <p>{price}</p>
                  </div>
                );
              })}
            </div>)}
      </div>
    );
  }
}

export default Home;
