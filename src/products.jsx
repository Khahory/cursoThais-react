import React, {useState} from "react";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";
import {Link, useParams} from "react-router-dom";
import PageNotFound from "./PageNotFound";

export default function Products() {
    //states
    const [size, setSize] = useState('');
    
    //consumir mi hook
    const {category} = useParams();
    const {data: productos, loading, error} = useFetch("products?category=" + category)
    
    const renderProduct = (p) => {
        return (
            <div key={p.id} className="product">
                <Link to={`/${category}/${p.id}`}>
                    <img src={`/images/${p.image}`} alt={p.name} />
                    <h3>{p.name}</h3>
                    <p>${p.price}</p>
                </Link>
            </div>
        );
    }
    
    const productosFiltrados = size
        ? productos.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
        : productos;
    
    if (error) throw error;
    if (loading) return <Spinner />
    if (productos.length === 0) return <PageNotFound/>
    
    return (
        <>
            <section id="filters">
                <label htmlFor="size">Filter by Size:</label>{" "}
                <select id="size" value={size} onChange={(event) => setSize(event.target.value)}>
                    <option value="">All sizes</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
                {size && <h2>Encontre {productosFiltrados.length} items</h2>}
            </section>
            <section id={'products'}>
                {productosFiltrados.map(renderProduct)}
            </section>
        </>
    );
}
