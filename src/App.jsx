import React, {useEffect, useReducer} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./products";
import {Route, Routes} from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import cartReducer from "./cartReducer";

let initialCart;
try {
    initialCart = JSON.parse(localStorage.getItem('cart')) ?? [];
} catch (e) {
    console.error('El carrito no se pudo convertir a JSON')
    initialCart = [];
}

export default function App() {
    //estados
    const [cart, dispatch] = useReducer(cartReducer, initialCart);
    
    //guardar carrito en memoria
    useEffect(() =>
        localStorage.setItem('cart', JSON.stringify(cart)), [cart]
    )
    
    return (
        <>
            <div className="content">
                <Header />
                <main>
                    <Routes>
                        <Route path={'/'} element={<h1>Welcome a esta vaina</h1>}/>
                        <Route path={'/:category'} element={<Products/>}/>
                        <Route path={'/:category/:id'} element={<Detail dispatch={dispatch}/>}/>
                        <Route path={'/cart'} element={<Cart cart={cart} dispatch={dispatch} />}/>
                        <Route path={'/checkout'} element={<Checkout cart={cart} dispatch={dispatch}/>}/>
                    </Routes>
                </main>
            </div>
            <Footer />
        </>
    );
}
