import React, {useContext, useEffect, useReducer} from "react";
import cartReducer from "./cartReducer";

const CartContext = React.createContext(null);

let initialCart;
try {
    initialCart = JSON.parse(localStorage.getItem('cart')) ?? [];
} catch (e) {
    console.error('El carrito no se pudo convertir a JSON')
    initialCart = [];
}

export function CartProvider(props){
    //estados
    const [cart, dispatch] = useReducer(cartReducer, initialCart);
    
    //guardar carrito en memoria
    useEffect(() =>
        localStorage.setItem('cart', JSON.stringify(cart)), [cart]
    )
    
    const contextValue = {
        cart, dispatch
    }
    
    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    )
}

//hock para poder consumir el cart context
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error(
            "useCart debe usarse dentro de un CartProvider. Envuelva un componente padre en <CartProvider> para corregir este error."
        );
    }
    return context
}
