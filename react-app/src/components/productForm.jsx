import React from 'react';
import axios from 'axios';

class ProductForm extends React.Component {
  state = { name: '', price: '' };

  async componentDidMount() {
    const id = this.props.match.params.id;
    if (id == 'new') return;
    const { data } = await axios.get('http://localhost:3000/products/' + id);
    const state = {};
    state.name = data.name;
    state.price = data.price;
    state.id = data.id;
    this.setState(state);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const obj = { ...this.state, count: 0, isInCart: false };
    if (id === 'new') {
      await axios.post('http://localhost:3000/products/', obj);
    } else {
      await axios.put('http://localhost:3000/products/' + id, obj);
    }
    this.props.history.replace('/admin');
  };
  handleChange = (e) => {
    let state = { ...this.state };
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  };
  render() {
    return (
      <React.Fragment>
        <h1>{this.props.match.params.id === 'new' ? 'Add' : 'Edit'}</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <lable htmlFor="name">Name</lable>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              id="name"
              name="name"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <lable htmlFor="price">Price</lable>
            <input
              type="text"
              className="form-control"
              value={this.state.price}
              id="price"
              name="price"
              onChange={this.handleChange}
            />
          </div>
          <button className="btn btn-primary">
            {this.props.match.params.id === 'new' ? 'Add' : 'Edit'}
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default ProductForm;
