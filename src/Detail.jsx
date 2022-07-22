import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail() {
    // constantes
    const {id} = useParams();
    const {data: product, loading, error} = useFetch('products/'+id);
    const navigate = useNavigate();
    
    if (error) return <PageNotFound/>
    if (loading) return <Spinner />
    
    return (
        <div id="detail">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p id="price">${product.price}</p>
            <p>
                <button onClick={() => navigate('/cart')} className={'btn btn-primary'}>Add to cart</button>
            </p>
            <img src={`/images/${product.image}`} alt={product.category} />
        </div>
    );
}
