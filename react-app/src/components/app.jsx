import React from 'react';
import Navbar from './navbar';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import About from './about';
import Contact from './contact';
import Home from './home';
import ShoppingCart from './shoppingCart';
import ProductDetails from './productDetails';
import NotFound from './notFound';
import Menu from './menu';
import Login from './login';
import ProductForm from './productForm';
import Admin from './admin';

class App extends React.Component {
  state = {
    products: [],
  };
  async componentDidMount() {
    const { data } = await axios.get('http://localhost:3000/products/');
    this.setState({ products: data });
  }
  handleDelete = async (product) => {
    const oldProducts = [...this.state.products];
    const newProducts = this.state.products.filter((p) => p.id != product.id);
    this.setState({ products: newProducts });
    try {
      await axios.delete('http://localhost:3000/products/' + product.id);
    } catch (ex) {
      toast("Can't Delete");
      this.setState({ products: oldProducts });
    }
  };

  handleIncrement = (product) => {
    let products = [...this.state.products];
    let indx = products.indexOf(product);
    products[indx].count++;
    this.setState({ products });
  };
  handleReset = () => {
    let products = [...this.state.products];
    products = products.map((p) => {
      p.count = 0;
      return p;
    });
    this.setState({ products });
  };

  handleInCart = (product) => {
    let products = [...this.state.products];
    let indx = products.indexOf(product);
    products[indx].isInCart = !products[indx].isInCart;
    this.setState({ products });
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar
          productsCount={this.state.products.filter((p) => p.isInCart).length}
        />
        <main className="container">
          <Switch>
            <Route
              path="/productDetails/:id"
              render={(props) => (
                <ProductDetails products={this.state.products} {...props} />
              )}
            />
            <Route
              path="/cart"
              render={(props) => (
                <ShoppingCart
                  products={this.state.products.filter((p) => p.isInCart)}
                  onDelete={this.handleInCart}
                  onReset={this.handleReset}
                  onIncrement={this.handleIncrement}
                  {...props}
                />
              )}
            />
            <Route
              path="/menu"
              render={(props) => (
                <Menu
                  {...props}
                  products={this.state.products}
                  onCartClick={this.handleInCart}
                />
              )}
            />
            <Route path="/productForm/:id" component={ProductForm} />
            <Route
              path="/admin"
              render={(props) => (
                <Admin
                  {...props}
                  products={this.state.products}
                  onDelete={this.handleDelete}
                />
              )}
            />
            <Route path="/login" component={Login} />
            <Route path="/notFound" component={NotFound} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/home" component={Home} />
            <Redirect from="/Home" to="/home" />
            <Redirect to="/notFound" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
