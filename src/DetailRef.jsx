import React, {useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function DetailRef({addToCart}) {
    // constantes
    const {id} = useParams();
    const skuRef = useRef()
    const navigate = useNavigate();
    const {data: product, loading, error} = useFetch('products/'+id);
    
    if (!product) return <PageNotFound/>
    if (loading) return <Spinner />
    if (error) throw error;
    
    return (
        <div id="detail">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p id="price">${product.price}</p>
            
            <select id="size" ref={skuRef}>
                <option value="">All sizes</option>
                {product.skus.map((s) => (
                    <option key={s.sku} value={s.sku}>
                        {s.size}
                    </option>
                ))}
            </select>
            
            <p>
                <button onClick={() => {
                    const sku = skuRef.current.value;
                    if (!sku) return alert('Select size.')
                    addToCart(id, sku)
                    navigate('/cart')
                }} className={'btn btn-primary'}>Add to cart</button>
            </p>
            <img src={`/images/${product.image}`} alt={product.category} />
        </div>
    );
}
