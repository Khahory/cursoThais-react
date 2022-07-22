import React, {useState} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./products";
import {Route, Routes} from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";

export default function App() {
    //estados
    const [cart, setCart] = useState([]);
    
    const addToCart = (id, sku) => {
        setCart((items) => {
            const itemInCart = items.find((i) => i.sku === sku);
            // valida mos que tenemos algo
            if (itemInCart){
                // crearemos una copia nueva de los item pero con un campo cambaindo su valor
                return items.map((i) =>
                    i.sku === sku ? {...i, quantity: i.quantity + 1} : i
                );
            } else  {
                //return new array with the new item insertadp
                return [...items, {id, sku, quantity: 1}]
            }
        });
    }
    
    return (
        <>
            <div className="content">
                <Header />
                <main>
                    <Routes>
                        <Route path={'/'} element={<h1>Welcome a esta vaina</h1>}/>
                        <Route path={'/:category'} element={<Products/>}/>
                        <Route path={'/:category/:id'} element={<Detail addToCart={addToCart}/>}/>
                        <Route path={'/cart'} element={<Cart cart={cart} />}/>
                    </Routes>
                </main>
            </div>
            <Footer />
        </>
    );
}
