import React from 'react';

class Admin extends React.Component {
  render() {
    const { products, onDelete } = this.props;
    return (
      <React.Fragment>
        <h1>Admin</h1>
        {
          <button
            className="btn btn-primary"
            onClick={() => this.props.history.push('/productForm/new')}
          >
            Add
          </button>
        }
        <table className="table">
          <thead>
            <tr>
              <td>Name</td>
              <td>Price</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>
                  <i
                    className="fas fa-edit"
                    onClick={() =>
                      this.props.history.push(`/productForm/${p.id}`)
                    }
                  ></i>
                </td>
                <td>
                  <i className="fas fa-trash" onClick={() => onDelete(p)}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Admin;
