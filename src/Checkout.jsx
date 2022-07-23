import React, { useState } from "react";
import {saveShippingAddress} from "./services/shippingService";

const STATUS = {
    IDLE: 'IDLE',
    SUBMITTED: 'SUBMITTED',
    SUBMITTING: 'SUBMITTING',
    COMPLETE: 'COMPLETE'
}

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
    city: "",
    country: "",
};

export default function Checkout({ cart, empyCart }) {
    const [address, setAddress] = useState(emptyAddress);
    const [status, setStatus] = useState(STATUS.IDLE);
    const [saveError, setSaveError] = useState(null);
    
    //drived state
    const errors = getErrors(address);
    const isValid = Object.keys(errors).length === 0;
    
    function handleChange(e) {
        e.persist();
        setAddress((curAdress) => {
            return {
                ...curAdress,
                [e.target.id]: e.target.value
            }
        })
    }
    
    function handleBlur(event) {
        // TODO
    }
    
    async function handleSubmit(event) {
        event.preventDefault();
        setStatus(STATUS.SUBMITTING);
        if (isValid){
            try {
                await saveShippingAddress(address);
                empyCart();
                setStatus(STATUS.COMPLETE);
            } catch (e) {
                setSaveError(e);
            }
        } else {
            setStatus(STATUS.SUBMITTED)
        }
    }
    
    function getErrors(){
        const result = {};
        if (!address.city) result.city = 'La ciudad es requerida'
        if (!address.country) result.country = 'El pais es requerido'
        return result
    }
    
    if (saveError) throw saveError;
    if (status === STATUS.COMPLETE){
        return <h1>Gracias por su compra</h1>
    }
    
    return (
        <>
            <h1>Shipping Info</h1>
            {!isValid && status === STATUS.SUBMITTED && (
                <div role={'alert'}>
                    <p>Por favor arregla los siguientes errores</p>
                    <ul>
                        {Object.keys(errors).map(key => {
                            return <li key={key}>{errors[key]}</li>
                        })}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="city">City</label>
                    <br />
                    <input
                        id="city"
                        type="text"
                        value={address.city}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                </div>
                
                <div>
                    <label htmlFor="country">Country</label>
                    <br />
                    <select
                        id="country"
                        value={address.country}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    >
                        <option value="">Select Country</option>
                        <option value="China">China</option>
                        <option value="India">India</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="USA">USA</option>
                    </select>
                </div>
                
                <div>
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Save Shipping Info"
                        disabled={status === STATUS.SUBMITTING}
                    />
                </div>
            </form>
        </>
    );
}
