import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './productdetail.scss';


function ProductDetail(props) {

    const data = useFetch(`http://34.217.106.68:3000/api/v1/products/${props.product}`);

    if (!data) {
        return <div>Loading...</div>;
    } else {

        const product = data.data;

        return(
            
            <div className="detail">
                <div className="card-detail">

                    <div className="card-detail-image">
                        <img src={`https:${product.image}`} alt='img-product' />
                        <div className="product-description">{ JSON.stringify(product.shortDescription) }</div>
                    </div>

                    <div className="card-detail-body">
                        <div>
                            <h3 className="product-detail-name">{product.name}</h3>  
                            <label className="product-detail-sku">SKU: {product.sku}</label>
                        </div>

                        <div className="product-long-description">{product.longDescription}</div>
                        <div className="product-detail-price">{product.price}</div>
                        
                        <div className="btn-detail">
                            <Link className="btn-more" to={`/`}>volver</Link>
                        </div>
                    </div>

                </div>
            </div>
        );
    }   

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
  
    useEffect(() => {
        fetchData()
    },[url]);
  
    return data;
  };


export default ProductDetail;