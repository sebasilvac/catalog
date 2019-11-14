import React from 'react';
import './cards.scss';

import Card from '../Card'

function Cards({products}) {

  return (
    <div className="cards">
    
        <h2>Listado de productos</h2>
    
        <div className="container-cards">

          {products.map( (prod, index) => (
            <Card key={prod.id} product={prod} />))
          }

        </div>  
      </div>
  );
}

export default Cards;