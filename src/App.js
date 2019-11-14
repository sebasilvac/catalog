import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Cards from './components/Cards';
import ProductDetail from './components/ProductDetail';

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

  const data = useFetch('http://34.217.106.68:3000/api/v1/products/1/15');

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
      const response = await fetch(url, {
        mode: 'cors'
      });
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
