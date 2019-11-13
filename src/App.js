import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Axios from 'axios';

import Cards from './components/Cards';
import ProductDetail from './components/ProductDetail';
import Paginate from './components/Paginate';

function App() {

  const initProduct = {
    'image':'',
    'name':'',
    'sku':'',
    'id':'',
    'price':'',
    'shortDescription': '',
    'longDescription': ''
  };

  const [products, setProducts] = useState([]);

  const data = useFetch('http://localhost:3000/api/v1/products/1/15');




  // const [dataPage, setDataPage] = useState({});
  // const [product, setProduct] = useState(initProduct);

  // const consultarAPI = async (page=1, limit=15) => {

  //   try {
  //     const result = await Axios(`http://localhost:3000/api/v1/products/${page}/${limit}`);
  //     setProducts(result.data.data.products);
  //     setDataPage(result.data.data);

  //   } catch (err) {

  //     console.log("error", err);
  //     consultarAPI();
  //   }
  // }

  // const consultarAPIBySku = async (sku) => {
  
  //   setProduct(initProduct);

  //   console.log(sku);

  //   try {
  //     const result = await Axios(`http://localhost:3000/api/v1/products/${sku}`);
  //     setProduct(result.data);

  //   } catch (err) {
  //     console.log("error", err);
  //     consultarAPIBySku(sku);
  //   }
  // }

  

  

  // useEffect(() => {
  //   consultarAPI()
  // }, []);

  return (
    <Router>
      <header>
        <h1>Catálogo</h1>

        <button className="button-header">
          Volver
        </button>

      </header>
      <div className="container">

        <Switch>
          <Route exact path="/" 
            render={
              () => {

                if (!data) {
                  return <div>Loading...</div>;
                } else {
                  return (
                    <Cards products={data.data.products} />
                  )
                }

              }
            }
          />

          <Route exact path="/detail/:sku" 
            render={ props => {
              const sku = props.match.params.sku;
              const producto = products.filter( prod => prod.sku === sku );
              return (<ProductDetail product={sku} />);
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

const useFetch = url => {
  const [data, setData] = useState(null);

  async function fetchData() {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (err){
        fetchData();
    }
  }

  useEffect(() => {fetchData()},[url]);
  return data;
};

export default App;
