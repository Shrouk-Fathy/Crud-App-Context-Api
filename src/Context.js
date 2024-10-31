import React, { Children, createContext, useEffect, useState } from "react";
import { data } from "./components/dp/data";
import Swal from "sweetalert2";


export const productContext = createContext();

export default function Context(props) {
  const [productsData, setProductsData] = useState(data);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");

  const getRecord = (id) => {
    return productsData.find((item) => item.id === id);
  };
  
  const handleEdit = (id) => {
    const selectedProduct = productsData[productsData.indexOf(getRecord(id))];
    setId(selectedProduct.id);
    setTitle(selectedProduct.title);
    setInfo(selectedProduct.info);
    setPrice(selectedProduct.price);
    setCompany(selectedProduct.company);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: `Are You sure to Delete Product ${id}`,
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed)
       {
        const tempProducts = productsData.filter((product) => product.id !== id);
        setProductsData(tempProducts);
       }
    });

  };

  const updateValue = (e, value) => {
    switch (value) {
      case "title":
        setTitle(e.target.value);
        break;
      case "info":
        setInfo(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;
      case "company":
        setCompany(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    if (id != "") {
      const updatedProduct = productsData[productsData.indexOf(getRecord(id))];
      updatedProduct.title = title;
      updatedProduct.info = info;
      updatedProduct.price = price;
      updatedProduct.company = company;
      setId("");
      setTitle("");
      setInfo("");
      setPrice("");
      setCompany("");
    } else {
      if (title && info && price && company) {
        const newProduct = {
          id: productsData.length + 1,
          title,
          info,
          price,
          company,
        };
        // productsData.push(newProduct);
        setProductsData([...productsData, newProduct]);
        setId("");
        setTitle("");
        setInfo("");
        setPrice("");
        setCompany("");
      }
    }
  };

  return (
    <div>
      <productContext.Provider
        value={{
          productsData,
          handleEdit,
          handleDelete,
          updateValue,
          handleSave,
          id,
          title,
          info,
          price,
          company,
        }}
      >
        {props.children}
      </productContext.Provider>
    </div>
  );
}
