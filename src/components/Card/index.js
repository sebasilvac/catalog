import React from 'react';
import { Link } from 'react-router-dom';
import './card.scss';


function Card({product}) {

  return(
    <div className="card">

      <div className="card-image">
        <img src={`https:${product.image}`} alt='img-product' />
        <div className="product-description">{product.shortDescription}</div>
      </div>

      <div className="card-body">
        <div>
          <h3 className="product-name">{product.name}</h3>  
          <label className="product-sku">SKU: {product.sku}</label>
        </div>

        
        <div className="product-price">{product.price}</div>


        
        {/* {product.longDescription} */}

        <div className="btn-detail">
          <Link className="btn-more"
            to={`/detail/${product.sku}`}
          >ver más</Link>

          
        </div>
      </div>

    </div>
  );

}


export default Card;