import React, { useContext, useState } from "react";
import { productContext } from "../Context";
import "./Home.css";

export default function Home() {
  const value = useContext(productContext);

  return (
    <div className="home-container">
      <h3>CRUD Operatoins</h3>
      <div className="products">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Information</th>
              <th>Price</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
            <tr>
              <th>
                <input
                  className="input"
                  value={value.title}
                  type="text"
                  placeholder="Title"
                  onChange={(e) => {
                    value.updateValue(e, "title");
                  }}
                />
              </th>
              <th>
                <input
                  className="input"
                  value={value.info}
                  type="text"
                  placeholder="Information"
                  onChange={(e) => {
                    value.updateValue(e, "info");
                  }}
                />
              </th>
              <th>
                <input
                  className="input"
                  value={value.price}
                  type="text"
                  placeholder="Price"
                  onChange={(e) => {
                    value.updateValue(e, "price");
                  }}
                />
              </th>
              <th>
                <input
                  className="input"
                  value={value.company}
                  type="text"
                  placeholder="Company"
                  onChange={(e) => {
                    value.updateValue(e, "company");
                  }}
                />
              </th>
              <th>
                <button className="btn btn-dark" onClick={()=> value.handleSave()}>
                  {value.id ? "Save" : "Add"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {value.productsData.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.info}</td>
                  <td>{product.price}</td>
                  <td>{product.company}</td>
                  <td>
                    <button
                      className="btn btn-dark"
                      onClick={() => value.handleEdit(product.id)}
                    >
                      Edit
                    </button>
                    |
                    <button
                      className="btn btn-dark"
                      onClick={() => value.handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
